import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})

JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: '7d',
    },
  }),
}),
export class AuthModule {}
