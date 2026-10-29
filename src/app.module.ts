import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/jwt-auth.guard';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CatModule } from './cat/cat.module';
import { SitterProfileModule } from './sitter-profile/sitter-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    UsersModule,
    JwtModule,
    CatModule,
    SitterProfileModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
