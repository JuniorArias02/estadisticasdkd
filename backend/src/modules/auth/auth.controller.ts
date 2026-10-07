import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginDto } from './application/dto/login.dto.js';
import { RefreshTokenDto } from './application/dto/refresh-token.dto.js';
import { LoginUseCase } from './application/use-cases/login.use-case.js';
import { RefreshUseCase } from './application/use-cases/refresh.use-case.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshUseCase: RefreshUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.ejecutar(loginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.refreshUseCase.ejecutar(refreshTokenDto);
  }
}
