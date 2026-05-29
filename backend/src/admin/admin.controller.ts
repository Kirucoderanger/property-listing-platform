import {
  Controller,
  Get,
  UseGuards
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags
} from '@nestjs/swagger';

import { AdminService }
from './admin.service';

import { JwtAuthGuard }
from '../auth/guards/jwt-auth.guard';

import { RolesGuard }
from '../auth/guards/roles.guard';

import { Roles }
from '../auth/decorators/roles.decorator';

@ApiTags('Admin')
@ApiBearerAuth()

@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)

@Controller('admin')
export class AdminController {

  constructor(
    private adminService: AdminService
  ) {}

  @Roles('ADMIN')
  @Get('metrics')
  getMetrics() {

    return this.adminService.getMetrics();
  }
}