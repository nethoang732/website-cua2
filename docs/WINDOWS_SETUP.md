# Thiết lập Windows 11 và VS Code

Tài liệu này chuẩn bị môi trường phát triển local. Các giá trị trong `.env.example` chỉ dành cho máy phát triển; không dùng chúng làm secrets production.

## 1. Kiểm tra công cụ

Mở PowerShell và kiểm tra:

```powershell
node --version
corepack --version
pnpm --version
git --version
docker --version
docker compose version
code --version
```

Yêu cầu Node.js 24 LTS (tối thiểu 20.19), pnpm 11.25, Git, Docker Desktop với WSL 2 backend và VS Code. Cài Node.js từ [nodejs.org](https://nodejs.org/), Git từ [git-scm.com](https://git-scm.com/download/win), Docker Desktop từ [docker.com](https://www.docker.com/products/docker-desktop/) và VS Code từ [code.visualstudio.com](https://code.visualstudio.com/). Nếu Corepack có sẵn, chạy `corepack enable`; sau đó kích hoạt phiên bản dự án bằng `corepack prepare pnpm@11.25.0 --activate`. Nếu Corepack không được phân phối cùng Node, dùng `npm install --global pnpm@11.25.0`.

## 2. Lấy mã nguồn an toàn

Sau khi mã nguồn đã xuất hiện trên `main`, có thể lấy script trực tiếp mà không cần clone trước. Mở PowerShell thông thường và chạy:

```powershell
$BootstrapDirectory = Join-Path $env:TEMP ('eurowindow-setup-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $BootstrapDirectory | Out-Null
$SetupScript = Join-Path $BootstrapDirectory 'setup-windows.ps1'
Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/nethoang732/website-cua2/main/scripts/setup-windows.ps1' -OutFile $SetupScript
notepad $SetupScript
# Đọc script trước khi chạy; quyền thực thi chỉ áp dụng trong cửa sổ PowerShell này.
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
& $SetupScript -Destination 'E:\CONG VIEC\WEBSITE CUA PC'
```

Nếu tải script báo 404, dừng và kiểm tra mã nguồn/nhánh `main` trên GitHub. Không tạo repository thay thế. Thư mục tải tạm dùng tên riêng nên không ghi đè file sẵn có.

Hoặc chạy script từ một bản repository đã có:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\setup-windows.ps1
```

Script mặc định dùng `E:\CONG VIEC\WEBSITE CUA PC`. Có thể chỉ định vị trí khác:

```powershell
.\scripts\setup-windows.ps1 -Destination 'E:\CONG VIEC\WEBSITE CUA PC'
```

Script kiểm tra ổ đĩa, remote `main`, thư mục đích, remote hiện tại và working tree; chỉ pull fast-forward khi local sạch. Nó không xóa file, reset, commit hoặc push. Nếu GitHub chưa có nhánh `main`, script dừng thay vì tạo checkout rỗng. Trong trường hợp đó cần xuất bản mã nguồn lên GitHub theo quy trình được chủ dự án duyệt trước khi tải về Windows.

### GitHub Desktop

Cài GitHub Desktop, đăng nhập tài khoản có quyền repository. Nếu thư mục đích chưa tồn tại hoặc rỗng, chọn **File → Clone repository → URL**, nhập `https://github.com/nethoang732/website-cua2.git`, đặt Local path là `E:\CONG VIEC\WEBSITE CUA PC`, rồi clone nhánh `main`. Nếu đã clone bằng script, dùng **File → Add local repository** và chọn đúng thư mục này.

Nếu thư mục đích có dữ liệu nhưng không phải repository, dừng để kiểm tra/sao lưu; không xóa hoặc chép đè. Khi repository có thay đổi local hay commit riêng, dùng script để kiểm tra và dừng an toàn trước đồng bộ, rồi xem Changes/History trong Desktop. Không dùng Discard changes hoặc reset để ép cập nhật. Khi repository sạch và không có commit riêng, script chỉ cập nhật bằng fast-forward. Trong Desktop có thể chọn **Repository → Open in Visual Studio Code** sau khi đã cài VS Code.

## 3. Mở dự án và tạo cấu hình local

Mở PowerShell tại thư mục dự án:

```powershell
Set-Location 'E:\CONG VIEC\WEBSITE CUA PC'
code .
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
if (-not (Test-Path apps/api/.env)) { Copy-Item apps/api/.env.example apps/api/.env }
```

Các lệnh chỉ tạo `.env` khi chưa có, không ghi đè cấu hình sẵn có. Nếu cần đặt domain chính thức, sao chép `apps/web/.env.example` thành `apps/web/.env` sau khi xem nội dung. Mở VS Code terminal ở thư mục gốc và kiểm tra `.gitignore` loại các file này. Không dán giá trị bí mật vào GitHub, issue hay chat.

## 4. Cài dependencies và PostgreSQL

```powershell
pnpm install --frozen-lockfile
pnpm db:up
docker compose ps
```

Đợi trạng thái PostgreSQL là `healthy`. Dữ liệu lưu trong Docker volume `eurowindow-postgres`; lệnh dừng database không xóa volume:

```powershell
pnpm db:down
```

## 5. Prisma, migration và seed

```powershell
pnpm --filter @eurowindow/api prisma:generate
pnpm --filter @eurowindow/api exec prisma validate
pnpm db:migrate:deploy
pnpm db:seed
pnpm db:seed
```

Seed dùng `upsert` theo slug nên có thể chạy lại mà không tạo danh mục trùng. Lệnh migrate deploy chỉ áp dụng các migration đã commit; khi phát triển schema mới, dùng `pnpm db:migrate` để tạo migration và kiểm tra kỹ file SQL trước khi commit.

## 6. Chạy web và API

Khởi động cả hai ứng dụng trong terminal VS Code:

```powershell
pnpm dev
```

Mở `http://localhost:3000`. API health ở `http://localhost:4000/api/v1/health`; Swagger ở `http://localhost:4000/api/docs`. Health trả thành công khi API có thể kết nối PostgreSQL. Kiểm tra trực tiếp trong PowerShell:

```powershell
Invoke-RestMethod 'http://localhost:4000/api/v1/health'
```

Kết quả mong đợi: `status` và `database` đều là `ok`. Nếu muốn chạy riêng, mở hai terminal tại thư mục gốc: `pnpm --filter @eurowindow/web dev` và `pnpm --filter @eurowindow/api dev`.

Dừng tiến trình bằng `Ctrl+C`. Có thể khởi động database lại bằng `pnpm db:up`, rồi chạy lại `pnpm dev`.

## 7. Kiểm tra thay đổi

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

Không commit `.env`, `node_modules`, `.next`, `dist`, report kiểm thử hoặc dữ liệu Docker. Xem [DEPLOYMENT.md](DEPLOYMENT.md) về GitHub/Vercel và [ARCHITECTURE.md](ARCHITECTURE.md) về cấu trúc monorepo.
