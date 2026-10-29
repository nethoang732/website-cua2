# Phương án đồng bộ GitHub → Windows → Vercel

Chỉ thực hiện commit/push sau khi chủ dự án xác nhận. Tài liệu này là phương án, chưa được thực thi.

## Trạng thái đã xác minh

- Origin: `https://github.com/nethoang732/website-cua2.git`.
- Local: nhánh `work`, chưa có commit; mã nguồn hiện là file untracked.
- GitHub: repository truy cập được; `git ls-remote --symref origin` trả thành công nhưng không có refs; API không có nhánh. `main` là tên default branch dự kiến, chưa có commit/nhánh thực tế.
- Không có lịch sử để ghi đè tại thời điểm kiểm tra. Phải kiểm tra lại ngay trước xuất bản.

## Trình tự sau khi được xác nhận

1. Sao lưu mã nguồn hiện tại ra vị trí riêng trước thay đổi Git; giữ `.env` ở nơi riêng tư, không đưa vào gói xuất bản.
2. Kiểm tra `git status`, `git remote -v`, `git ls-remote --symref origin`, `git show-ref`, `git log --all --oneline --decorate`. Local chưa có commit thì `git log` báo lỗi là trạng thái dự kiến. Dừng nếu remote lỗi; không suy luận repository rỗng từ lỗi mạng/quyền.
3. Nếu remote vẫn hoàn toàn rỗng: đổi tên nhánh unborn `work` thành `main` bằng `git branch -m main` (không dùng `-M`). Stage riêng danh sách mã nguồn đã duyệt; xem `git diff --cached --stat`, toàn bộ `git diff --cached`, quét secrets lại, xác nhận không có `.env`, dump DB, khóa, cache hay build output. Chỉ sau đó tạo initial commit và push thông thường `git push -u origin main`.
4. Nếu remote đã có commit: không tạo lịch sử độc lập để đè lên. Clone remote vào thư mục mới, checkout nhánh tích hợp từ `origin/main` (hoặc default branch hiện hữu sau khi xác minh), đưa mã nguồn đã duyệt vào đó mà không chép `.git`, `.env`, dependencies hay output. So sánh từng file trùng và giữ nội dung/lịch sử remote. Commit thay đổi trên nhánh tích hợp, mở PR về `main`; kiểm tra CI và giải quyết xung đột trước merge sau xác nhận. Giữ nguyên checkout ban đầu để đối chiếu.
5. Kiểm tra lại refs trước push. Nếu remote thay đổi hoặc push bị từ chối: dừng, fetch và xem lịch sử; không force push, reset hard, clean hoặc cho phép unrelated histories một cách tự động.
6. Sau khi GitHub có nguồn trên `main`, chạy `scripts/setup-windows.ps1` trên Windows; mặc định `E:\CONG VIEC\WEBSITE CUA PC`. Script chỉ clone hoặc fast-forward, dừng khi thư mục có dữ liệu không phải repo, sai origin/branch, working tree bẩn, local ahead hoặc không có remote main. Làm theo `WINDOWS_SETUP.md` để cài dependencies, migration, seed và kiểm tra health trên máy Windows.
7. Kiểm tra Vercel Project Settings: repository đúng, Root Directory `apps/web`, Framework Next.js, production branch `main`; cho phép truy cập workspace packages ngoài Root Directory nếu dashboard có tùy chọn này. Dùng package build mặc định `next build`, output mặc định `.next`, giữ pnpm workspace và lockfile gốc. Không đưa `DATABASE_URL` hoặc secrets backend vào frontend. NestJS/PostgreSQL cần dịch vụ riêng. Chưa deploy cho đến khi có xác nhận riêng.

Nếu Vercel đã kết nối GitHub, phải kiểm tra chế độ tự deploy trước push vì push/merge vào `main` có thể kích hoạt production tự động. Khi chưa được phép deploy, tạm dừng Git integration deployment hoặc chưa kết nối project trước khi xuất bản nguồn.

## Giới hạn kiểm tra

Chưa chạy PowerShell trên Windows và chưa xác minh Vercel dashboard. Build web local thành công chứng minh cấu hình mã nguồn build được, không chứng minh project Vercel đã được thiết lập. Kiểm tra thực tế hai môi trường này sau khi có nguồn GitHub và quyền truy cập tương ứng.

## Lần kiểm tra trước xuất bản sau khi được cấp quyền

Chủ dự án đã cho phép commit/push Giai đoạn 1 với message `feat: initialize Eurowindow website monorepo`. Kiểm tra lại remote thành công và vẫn không có refs; checkout chưa có commit, nhánh `work`.

Chưa thực hiện commit/push vì chưa xác minh được Git Integration tự deploy: các lệnh đọc GitHub API cho hooks, installations, deployments và workflows đều trả `Forbidden`; môi trường không có connector Vercel. Đây không phải bằng chứng có integration, cũng không chứng minh không có integration. Workflow CI trong nguồn chỉ validate/test/build, không có bước deploy.

Điểm cần giải quyết trước push: chủ dự án kiểm tra Vercel dashboard và xác nhận repository chưa kết nối project nào, hoặc tự deploy đã được tạm dừng cho repository này; hoặc cấp khả năng đọc cấu hình để kiểm chứng. Không cần cấp lại quyền commit/push. Giữ Root Directory `apps/web`; không tự kết nối Vercel hoặc tạo deployment.

Hướng dẫn Windows đã bổ sung cách tải script vào thư mục tạm riêng, GitHub Desktop, VS Code và kiểm tra health bằng PowerShell. Chỉ clone sau khi mã nguồn đã có trên `main`.
