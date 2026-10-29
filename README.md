# Eurowindow

Nền tảng website Eurowindow theo hướng Luxury Minimalism × Modern Architecture × Editorial Design. Giai đoạn 1 dựng nền tảng kỹ thuật, landing page và các route khung; nội dung sản phẩm/công trình chỉ được thêm khi có tài liệu đã xác minh.

## Công nghệ

- Monorepo: pnpm workspaces, Turborepo, TypeScript strict.
- Web: Next.js App Router, React, Tailwind CSS, Lucide, Motion for React, Zod và nền tảng Three.js/R3F.
- API: NestJS REST `/api/v1`, Swagger, `class-validator`, exception filter.
- Database: PostgreSQL local qua Docker Compose, Prisma migration/seed.
- Tests: Vitest, Jest, Playwright smoke tests.

## Bắt đầu nhanh

Yêu cầu Node.js 24 LTS (tối thiểu 20.19), pnpm 11.25 và Docker Desktop/Docker Engine.

```sh
cp .env.example .env                 # PowerShell: Copy-Item .env.example .env
cp apps/api/.env.example apps/api/.env
pnpm install --frozen-lockfile
pnpm db:up
pnpm --filter @eurowindow/api prisma:generate
pnpm db:migrate:deploy
pnpm db:seed
pnpm dev
```

- Web: <http://localhost:3000>
- API health: <http://localhost:4000/api/v1/health>
- Swagger: <http://localhost:4000/api/docs>

Hướng dẫn đầy đủ cho Windows/VS Code ở [docs/WINDOWS_SETUP.md](docs/WINDOWS_SETUP.md). Xem [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) để kết nối GitHub và cấu hình Vercel. Nếu môi trường hạn chế quyền ghi pnpm store, đặt `PNPM_CONFIG_STORE_DIR` sang một thư mục có thể ghi.

## Kiểm tra

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Playwright yêu cầu Chromium: `pnpm exec playwright install chromium`.

## Tài liệu

- [Kiến trúc](docs/ARCHITECTURE.md)
- [Báo cáo giai đoạn 1](docs/PHASE_1_REPORT.md)
- [Thiết lập Windows](docs/WINDOWS_SETUP.md)
- [Triển khai và chạy local](docs/DEPLOYMENT.md)
- [Kế hoạch các giai đoạn](docs/IMPLEMENTATION_PLAN.md)
