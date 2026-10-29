# Kế hoạch triển khai

## Giai đoạn 1 — nền tảng

- [x] Monorepo pnpm/Turborepo, TypeScript strict, lint/format và CI.
- [x] Ứng dụng Next.js, layout editorial responsive, route khung, metadata, robots và sitemap an toàn khi chưa có domain.
- [x] NestJS API prefix, health, Swagger, validation và lỗi tập trung.
- [x] PostgreSQL local bằng Compose, Prisma schema, migration và seed mẫu.
- [x] Shared UI/types, kiểm thử unit và Playwright smoke test.
- [x] Tài liệu kiến trúc, chạy local và triển khai Vercel.

## Giai đoạn 2 — nghiệp vụ và nội dung đã xác minh

1. Xác nhận guideline thương hiệu, domain, thông tin doanh nghiệp, nội dung tiếng Việt và quyền sử dụng media.
2. Mở rộng Prisma models cùng migration cho sản phẩm, dự án, bài viết, tài liệu, media và leads; thống nhất taxonomy với chủ sở hữu dữ liệu.
3. Xây CRUD và API public/read cho từng domain, phân trang, lọc, validation, authorization, audit và rate limiting.
4. Triển khai quy trình tiếp nhận lead, chính sách lưu trữ, chống spam và thông báo theo yêu cầu vận hành.
5. Xây trang danh sách/chi tiết có dữ liệu thật, tìm kiếm, form liên hệ, nội dung quản trị và luồng đăng nhập.
6. Bổ sung SEO theo nội dung đã xuất bản, ảnh có quyền, structured data đã kiểm chứng, sitemap canonical và redirect.
7. Bổ sung integration/E2E tests, kiểm thử accessibility, hiệu năng, bảo mật, backup/restore và giám sát.
8. Chọn hạ tầng API/database, thiết lập secrets và pipeline release. Chỉ triển khai production sau khi được giao quyền và phê duyệt riêng.
