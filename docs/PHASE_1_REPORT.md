# Báo cáo nghiệm thu Giai đoạn 1

Kiểm tra ngày 29/10/2026 (giờ Việt Nam). Phạm vi: cloud checkout `/workspace/website-cua2`, PostgreSQL local và kiểm tra chỉ đọc GitHub. Chưa commit, push hoặc deploy.

## Kết quả

| Hạng mục     | Kết quả                                                                                                                                                                                                                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mạng         | Policy hiện hành đã cho phép `binaries.prisma.sh`. Sandbox mặc định chặn proxy (`EPERM`); chạy với quyền thực thi phù hợp thành công, không đổi proxy/TLS/checksum.                                                                                                                                                 |
| Prisma 6.19  | Generate và validate thành công, không bỏ qua checksum.                                                                                                                                                                                                                                                             |
| PostgreSQL   | PostgreSQL 16 healthy; chỉ bind `127.0.0.1:5432`.                                                                                                                                                                                                                                                                   |
| Migration    | Prisma đã áp `20261029000000_init`; `prisma migrate status` xác nhận schema up to date.                                                                                                                                                                                                                             |
| Seed         | Chạy hai lần; SQL xác nhận 3 danh mục, 3 slug riêng biệt.                                                                                                                                                                                                                                                           |
| NestJS       | Production start thành công; health HTTP 200 với `status: ok`, `database: ok`; Swagger HTTP 200.                                                                                                                                                                                                                    |
| Dependencies | Frozen install thành công; kiểm tra supply-chain 1178 entries đạt.                                                                                                                                                                                                                                                  |
| Kiểm thử     | Lint, typecheck, unit tests 6/6 và production build chạy lại với Turbo `--force`: 14/14 tasks đạt. Sau sửa cấu hình API: build/start, typecheck và 2 API tests đạt. Playwright 2/2 đạt; format check đạt.                                                                                                           |
| Secrets      | Gitleaks 8.30.0 quét toàn bộ 94 file ứng viên đưa lên Git: không phát hiện leaks. Binary công cụ đã được đối chiếu checksum bản phát hành chính thức. Rà soát thủ công chỉ thấy thông tin DB mẫu local. `.env` root/API được Git ignore, không nằm trong danh sách ứng viên. Không có commit local để quét lịch sử. |
| GitHub       | Origin đúng `nethoang732/website-cua2`; API xác nhận quyền và repository public, size 0. `git ls-remote --symref origin` thành công, không có refs; API branches rỗng. Nhánh local `work` chưa có commit; số commit local 0.                                                                                        |
| Windows      | Script mặc định đúng `E:\CONG VIEC\WEBSITE CUA PC`; rà soát tĩnh cơ chế bảo toàn dữ liệu đạt. Chưa chạy thực tế trên Windows vì cloud không có PowerShell/ổ E:.                                                                                                                                                     |
| Vercel       | Mã nguồn Next.js/workspace và hướng dẫn phù hợp Root Directory `apps/web`, production branch `main`. Chưa xác minh dashboard thực tế vì chưa có connector/project Vercel; chưa deploy.                                                                                                                              |

Dữ liệu seed đã đối chiếu trực tiếp:

- `cua-va-he-cua`: Cửa và hệ cửa, position 1.
- `vach-kinh`: Vách kính, position 2.
- `giai-phap-kien-truc`: Giải pháp kiến trúc, position 3.

## Thay đổi bổ sung

- `apps/api/tsconfig.build.json`: giới hạn build vào `src`, đặt `rootDir` để sinh `dist/main.js` đúng với script `start`. Trước đó seed nằm trong build khiến output là `dist/src/main.js`, API production start thất bại.
- CI thêm bước generate Prisma Client rõ ràng trước validate/typecheck/build.
- Cập nhật báo cáo và phương án đồng bộ GitHub an toàn.

Các lỗi cài đặt/build ban đầu do sandbox hoặc thư mục cache pnpm ngoài workspace đã được xử lý bằng quyền thực thi phù hợp và cache nằm trong workspace; không sửa dependency, lockfile hoặc vô hiệu chính sách. Cảnh báo pnpm `enableGlobalVirtualStore` và cảnh báo deprecated `package.json#prisma` còn xuất hiện nhưng không chặn nghiệm thu.

## Phạm vi nghiệm thu và bước tiếp theo

Backend giai đoạn 1 là nền tảng NestJS/Prisma, migration/seed Category và health kết nối DB. Các module sản phẩm, danh mục, auth, leads… hiện là khung, chưa phải API nghiệp vụ hoàn chỉnh.

Đã sẵn sàng trình chủ dự án xác nhận xuất bản mã nguồn. Quy trình ở `GITHUB_SYNC_PLAN.md` phải kiểm tra lại remote ngay trước commit/push vì repository có thể thay đổi sau lần nghiệm thu. Windows và Vercel thực tế là các bước sau đồng bộ GitHub, cần kiểm tra trên máy/dịch vụ tương ứng. Không thực hiện commit, push, merge hoặc deploy trong lần nghiệm thu này.
