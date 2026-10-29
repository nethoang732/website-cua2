# Kiến trúc giai đoạn 1

## Tổng quan

Repository dùng pnpm workspace và Turborepo với hai ứng dụng hiện hành: `apps/web` cho Next.js App Router và `apps/api` cho NestJS REST API. Mã dùng chung nằm trong `packages/ui` và `packages/types`; `packages/config` được để dành cho việc tách cấu hình khi có thêm workspace thực sự cần dùng chung.

Admin chưa tách thành ứng dụng riêng. Giai đoạn đầu chưa có luồng quản trị, phân quyền hay yêu cầu triển khai độc lập; khi cần có thể thêm khu vực `/admin` trong Next.js, sau đó mới tách nếu ranh giới sản phẩm và vận hành yêu cầu. Chưa tạo package cấu hình rỗng hoặc app admin dư thừa.

## Web

- Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS, Lucide React, Motion for React, Zod và dependencies Three.js/R3F/Drei đã sẵn sàng.
- Trang chủ dùng SVG hình khối kiến trúc tự tạo, không dùng ảnh bên thứ ba.
- Các route dùng URL tiếng Việt không dấu: `/gioi-thieu`, `/san-pham`, `/cong-trinh`, `/tin-tuc`, `/tai-lieu`, `/tim-kiem`, `/lien-he`. Những trang chưa có nội dung thật là placeholder và không được đưa vào sitemap.
- Metadata dùng Metadata API. Không cấu hình domain canonical trước khi có domain chính thức. Sitemap chỉ phát sinh URL trang chủ khi `NEXT_PUBLIC_SITE_URL` đã được cấu hình.
- Three.js preview nằm trong client-only dynamic import, để canvas không tham gia SSR hay lập chỉ mục.

## API và dữ liệu

- NestJS phục vụ prefix `/api/v1`; health endpoint là `/api/v1/health` và thực hiện truy vấn PostgreSQL `SELECT 1`, Swagger là `/api/docs`.
- `ValidationPipe` bật whitelist, transform và từ chối field thừa. `ApiExceptionFilter` chuẩn hóa phản hồi lỗi.
- Prisma kết nối PostgreSQL qua `DATABASE_URL`. Compose chỉ mở cổng local trên loopback; không dùng cơ sở dữ liệu production.
- Prisma hiện có bảng `Category`, migration khởi tạo và seed idempotent cho ba nhóm nội dung khởi đầu. Các nhóm này là dữ liệu phân loại tạm, không chứa thông số sản phẩm.
- Các domain module được tạo làm điểm mở rộng; nghiệp vụ CRUD/auth chưa được triển khai trong giai đoạn scaffold.

## Kiểm thử

- Vitest kiểm tra trang chủ, schema dùng chung và UI component.
- Jest kiểm tra health controller.
- Playwright có smoke test cho giao diện, metadata, robots, route và tràn ngang ở 375, 390, 768, 1024, 1440 px.
- GitHub Actions chạy lint, typecheck, unit tests và build. Chạy E2E tại CI cần cài browser Chromium.
