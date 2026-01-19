import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Permite que o seu Frontend acesse a API
  
  await app.listen(3000);
  console.log('🚀 Servidor rodando sem Prisma em http://localhost:3000');
}
bootstrap();