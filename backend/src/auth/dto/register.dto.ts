@IsEmail()
email: string;

@MinLength(6)
password: string;

@IsEnum(Role)
role: Role;

import { IsEmail, MinLength, IsEnum } from 'class-validator';
import { Role } from '../entities/user.entity';
export class RegisterDto {
    
}