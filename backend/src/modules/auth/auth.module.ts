import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller.js';
import { LoginUseCase } from './application/use-cases/login.use-case.js';
import { RefreshUseCase } from './application/use-cases/refresh.use-case.js';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION', '4h') as any },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUseCase, RefreshUseCase, JwtStrategy, JwtAuthGuard],
  exports: [PassportModule, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}