import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { RequestTokenDto, ResponseTokenDto } from './dtos/token.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser({ email, name, temporaryPassword }: RegisterUserDto) {
    const hashedPassword = crypto
      .createHash('sha512')
      .update(temporaryPassword)
      .digest('hex');
    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        temporaryPassword: hashedPassword,
      },
    });
    return user;
  }

  async generateToken({
    email,
    password,
  }: RequestTokenDto): Promise<ResponseTokenDto> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (
      !user ||
      crypto.createHash('sha512').update(password).digest('hex') !==
        user.temporaryPassword
    ) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshToken({ token }: { token: string }): Promise<ResponseTokenDto> {
    const decoded = this.jwtService.verify(token);
    const user = await this.prismaService.user.findUnique({
      where: { id: decoded.sub },
    });

    if (!user) {
      throw new Error('Invalid token');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async setNewPassword({
    email,
    newPassword,
  }: {
    email: string;
    newPassword: string;
  }): Promise<void> {
    const hashedPassword = crypto
      .createHash('sha512')
      .update(newPassword)
      .digest('hex');
    await this.prismaService.user.update({
      where: { email },
      data: { temporaryPassword: hashedPassword },
    });
  }

  verifyJwt(token: string) {
    return this.jwtService.verify(token);
  }
}
