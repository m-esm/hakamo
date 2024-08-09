import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthService } from './auth.service';
import { RequestTokenDto, ResponseTokenDto } from './dtos/token.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  registerUser(@Body() dto: RegisterUserDto) {
    return this.authService.registerUser(dto);
  }

  @Post('token')
  @ApiOperation({ summary: 'Generate a new token' })
  @ApiResponse({ status: 201, description: 'Token generated successfully' })
  generateToken(@Body() dto: RequestTokenDto): Promise<ResponseTokenDto> {
    return this.authService.generateToken(dto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh an existing token' })
  @ApiResponse({ status: 201, description: 'Token refreshed successfully' })
  refreshToken(@Body() dto: { token: string }): Promise<ResponseTokenDto> {
    return this.authService.refreshToken(dto);
  }

  @Post('set-new-password')
  @ApiOperation({ summary: 'Set a new password after first login' })
  @ApiResponse({ status: 200, description: 'Password set successfully' })
  setNewPassword(
    @Body() dto: { email: string; newPassword: string },
  ): Promise<void> {
    return this.authService.setNewPassword(dto);
  }
}
