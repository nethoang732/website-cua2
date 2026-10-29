[CmdletBinding()]
param(
    [string]$Destination = 'E:\CONG VIEC\WEBSITE CUA PC'
)

$ErrorActionPreference = 'Stop'
$Remote = 'https://github.com/nethoang732/website-cua2.git'
$Branch = 'main'

function Stop-WithMessage {
    param([Parameter(Mandatory = $true)][string]$Message)
    Write-Host "LỖI: $Message" -ForegroundColor Red
    exit 1
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Stop-WithMessage 'Không tìm thấy Git. Cài Git từ https://git-scm.com/download/win rồi chạy lại.'
}

$DriveRoot = [System.IO.Path]::GetPathRoot([System.IO.Path]::GetFullPath($Destination))
if (-not (Test-Path -LiteralPath $DriveRoot -PathType Container)) {
    Stop-WithMessage "Không tìm thấy ổ đĩa $DriveRoot. Kiểm tra ổ đĩa hoặc truyền -Destination tới vị trí hợp lệ."
}

Write-Host "Đang kiểm tra nhánh $Branch trên GitHub..."
$RemoteMain = & git ls-remote --heads $Remote "refs/heads/$Branch" 2>&1
if ($LASTEXITCODE -ne 0) {
    Stop-WithMessage "Không truy cập được remote GitHub. Kiểm tra mạng/quyền GitHub. Chi tiết: $RemoteMain"
}
if ([string]::IsNullOrWhiteSpace(($RemoteMain | Out-String).Trim())) {
    Stop-WithMessage "GitHub chưa có nhánh $Branch. Script dừng để tránh tải một repository rỗng; hãy xuất bản mã nguồn theo quy trình được duyệt rồi chạy lại."
}

$Destination = [System.IO.Path]::GetFullPath($Destination)
$Parent = Split-Path -Parent $Destination
if (Test-Path -LiteralPath $Destination -PathType Container) {
    $TopLevel = & git -C $Destination rev-parse --show-toplevel 2>$null
    $IsRepository = ($LASTEXITCODE -eq 0) -and -not [string]::IsNullOrWhiteSpace($TopLevel)

    if (-not $IsRepository) {
        $ExistingItems = @(Get-ChildItem -LiteralPath $Destination -Force)
        if ($ExistingItems.Count -gt 0) {
            Stop-WithMessage "Thư mục đích đã có dữ liệu nhưng không phải Git repository: $Destination. Script không thay đổi thư mục này. Hãy kiểm tra và chọn vị trí khác hoặc tự sao lưu/xử lý trước."
        }

        Write-Host "Thư mục đích đang tồn tại nhưng rỗng: $Destination"
        & git clone --branch $Branch --single-branch $Remote $Destination
        if ($LASTEXITCODE -ne 0) {
            Stop-WithMessage 'Clone thất bại. Script không xóa thư mục đích; hãy kiểm tra trạng thái trước khi chạy lại.'
        }
        Write-Host "Đã clone $Remote ($Branch) vào $Destination" -ForegroundColor Green
        exit 0
    }

    $ResolvedDestination = [System.IO.Path]::GetFullPath($Destination).TrimEnd('\')
    $ResolvedTopLevel = [System.IO.Path]::GetFullPath(($TopLevel | Out-String).Trim()).TrimEnd('\')
    if (-not [string]::Equals($ResolvedDestination, $ResolvedTopLevel, [System.StringComparison]::OrdinalIgnoreCase)) {
        Stop-WithMessage "Thư mục đích nằm bên trong một Git repository khác ($ResolvedTopLevel). Script không pull nhầm repository."
    }
} else {
    if (-not (Test-Path -LiteralPath $Parent -PathType Container)) {
        New-Item -ItemType Directory -Path $Parent -Force | Out-Null
    }
    & git clone --branch $Branch --single-branch $Remote $Destination
    if ($LASTEXITCODE -ne 0) {
        Stop-WithMessage 'Clone thất bại. Script không xóa thư mục đích; hãy kiểm tra trạng thái trước khi chạy lại.'
    }
    Write-Host "Đã clone $Remote ($Branch) vào $Destination" -ForegroundColor Green
    exit 0
}

$Origin = & git -C $Destination remote get-url origin 2>&1
if ($LASTEXITCODE -ne 0) {
    Stop-WithMessage "Không đọc được remote origin tại $Destination. Script không tự sửa remote."
}
if (($Origin | Out-String).Trim() -ne $Remote) {
    Stop-WithMessage "Remote origin không khớp repository dự kiến: $($Origin | Out-String). Hãy kiểm tra thủ công; script không đổi remote."
}

$Status = & git -C $Destination status --porcelain 2>&1
if ($LASTEXITCODE -ne 0) {
    Stop-WithMessage 'Không đọc được working tree. Script dừng trước khi fetch/pull.'
}
if (-not [string]::IsNullOrWhiteSpace(($Status | Out-String).Trim())) {
    Write-Host "Working tree đang có thay đổi tại $Destination; script không fetch/pull để bảo toàn dữ liệu:" -ForegroundColor Yellow
    Write-Host $Status
    exit 2
}

$CurrentBranch = (& git -C $Destination branch --show-current 2>&1 | Out-String).Trim()
if ($LASTEXITCODE -ne 0 -or $CurrentBranch -ne $Branch) {
    Stop-WithMessage "Nhánh hiện tại là '$CurrentBranch', không phải '$Branch'. Hãy kiểm tra thủ công; script không chuyển nhánh."
}

& git -C $Destination fetch origin "refs/heads/$($Branch):refs/remotes/origin/$($Branch)"
if ($LASTEXITCODE -ne 0) {
    Stop-WithMessage 'Fetch thất bại. Working tree không bị thay đổi; kiểm tra mạng và quyền GitHub.'
}

$Counts = (& git -C $Destination rev-list --left-right --count "HEAD...origin/$Branch" 2>&1 | Out-String).Trim() -split '\s+'
if ($LASTEXITCODE -ne 0 -or $Counts.Count -ne 2) {
    Stop-WithMessage 'Không xác định được trạng thái ahead/behind. Script dừng mà không pull.'
}
$Ahead = [int]$Counts[0]
$Behind = [int]$Counts[1]
if ($Ahead -gt 0) {
    Stop-WithMessage "Local đang có $Ahead commit chưa có trên origin/$Branch. Không pull để tránh che khuất khác biệt; hãy xem lịch sử Git thủ công."
}
if ($Behind -eq 0) {
    Write-Host "Đã mới nhất với origin/$Branch. Không cần pull." -ForegroundColor Green
    exit 0
}

& git -C $Destination pull --ff-only origin $Branch
if ($LASTEXITCODE -ne 0) {
    Stop-WithMessage 'Fast-forward pull thất bại. Không reset hoặc ghi đè file; hãy kiểm tra Git status và xử lý thủ công.'
}

Write-Host "Đã cập nhật an toàn $Destination lên origin/$Branch." -ForegroundColor Green
