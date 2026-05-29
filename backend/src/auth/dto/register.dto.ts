import {
  IsEmail,
  IsEnum,
  MinLength
} from 'class-validator';

import { Role } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {

  @ApiProperty({
    example: 'admin@test.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123'
  })
  @MinLength(6)
  password: string;

  @ApiProperty({
    enum: Role,
    example: 'ADMIN'
  })
  @IsEnum(Role)
  role: Role;
}