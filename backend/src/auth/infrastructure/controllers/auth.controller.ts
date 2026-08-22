import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.loginUseCase.execute(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return AuthResponseDto.from(user);
  }
}
