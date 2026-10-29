import { HealthController } from './health.controller';
import { PrismaService } from '../../prisma/prisma.service';

describe('HealthController', () => {
  it('reports the API and database as healthy', async () => {
    const prisma = { $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]) };
    const result = await new HealthController(prisma as unknown as PrismaService).getHealth();

    expect(result.status).toBe('ok');
    expect(result.service).toBe('eurowindow-api');
    expect(result.database).toBe('ok');
    expect(Number.isNaN(Date.parse(result.timestamp))).toBe(false);
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
  });

  it('reports the service unavailable when PostgreSQL cannot be reached', async () => {
    const prisma = { $queryRaw: jest.fn().mockRejectedValue(new Error('database unavailable')) };
    const controller = new HealthController(prisma as unknown as PrismaService);

    await expect(controller.getHealth()).rejects.toMatchObject({ status: 503 });
  });
});
