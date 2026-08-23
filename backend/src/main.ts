import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { parseCorsOrigins } from './shared/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register());
  app.enableCors({
    origin: parseCorsOrigins(process.env.CORS_ORIGINS),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
