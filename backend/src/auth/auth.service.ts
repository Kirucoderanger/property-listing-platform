import {
  Injectable,
  Inject,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
//import { PrismaClient } from '@prisma/client';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await (this.prisma as any).user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await (this.prisma as any).user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
      },
    });

    return {
      message: 'User created',
      user,
    };
  }

  async login(dto: LoginDto) {
    const user = await (this.prisma as any).user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      role: user.role,
    });

    return {
      access_token: token,
    };
  }
}
