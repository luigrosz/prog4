import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER ?? 'daria',
      password: process.env.DB_PASS ?? 'daria123',
      database: process.env.DB_NAME ?? 'daria_wiki',
      autoLoadEntities: true,
      synchronize: true, // ponytail: dev only, migrations for prod
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend'),
    }),
    ArticlesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
