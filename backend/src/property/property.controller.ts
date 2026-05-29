import { Controller } from '@nestjs/common';
import { Post, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('property')
export class PropertyController {
  @Roles('OWNER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createProperty() {
    throw new Error('Function not implemented.');
  }
}
