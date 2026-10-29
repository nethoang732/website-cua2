# Chạy local và triển khai

## GitHub và đồng bộ mã nguồn

Remote dự kiến là `https://github.com/nethoang732/website-cua2.git`; nhánh chính là `main`. Kiểm tra `git remote -v`, `git status` và nhánh trước khi đồng bộ. Chỉ commit/push sau khi xem diff và được chủ dự án cho phép. Không commit `.env`, dữ liệu database, `node_modules`, `.next` hay `dist`.

Với GitHub Desktop, chọn **File → Clone repository**, nhập URL remote và chọn thư mục dự án. Để cập nhật: **Fetch origin**, kiểm tra thay đổi, rồi **Pull origin**. Trước khi tạo commit, kiểm tra danh sách file trong Changes và loại `.env`, dữ liệu local hoặc secrets. Nếu remote chưa có `main`, cần chủ dự án quyết định cách xuất bản nguồn trước khi clone; script Windows sẽ dừng an toàn trong trường hợp này.

## Vercel: Preview và Production

1. Trong Vercel chọn **Add New → Project**, kết nối GitHub và chọn `nethoang732/website-cua2`.
2. Đặt **Root Directory** là `apps/web`. Giữ chế độ pnpm workspace/monorepo để Vercel nhận `pnpm-lock.yaml` và các package workspace từ thư mục gốc.
3. Framework là Next.js; dùng build mặc định `next build` của package `@eurowindow/web`. Không trỏ Vercel vào `apps/api`; NestJS là dịch vụ riêng, không phải Next.js serverless frontend.
4. Không cần biến môi trường cho trang tĩnh hiện tại. Nếu đặt `NEXT_PUBLIC_SITE_URL`, chỉ dùng origin HTTPS chính thức sau khi domain đã được xác nhận. Không thêm slash/path và không đặt giá trị thử nghiệm vào Production.
5. Vercel tạo Preview Deployment cho Pull Request và Production Deployment khi push/merge vào `main`, theo Git integration settings. Xác minh branch production là `main` trước khi bật.
6. Chưa cấu hình custom domain, database production hay tự deploy trong giai đoạn này. Giữ secrets ở Vercel Project Settings, không trong repository.

Vercel Hobby chỉ dành cho sử dụng phi thương mại theo điều khoản của Vercel. Trước khi website phục vụ hoạt động kinh doanh, cần chuyển sang gói phù hợp như Vercel Pro hoặc chọn hạ tầng thương mại khác. Không kích hoạt dịch vụ trả phí khi chưa được chấp thuận.

Hướng dẫn chi tiết Windows, chạy PostgreSQL, Prisma, API và frontend nằm tại [WINDOWS_SETUP.md](WINDOWS_SETUP.md). CI được định nghĩa trong `.github/workflows/ci.yml`; nó không chạy migration hay kết nối database production.
