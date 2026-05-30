import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags
} from '@nestjs/swagger';

import {
  PropertyService
} from './property.service';

import {
  JwtAuthGuard
} from '../auth/guards/jwt-auth.guard';

import {
  CurrentUser
} from '../auth/decorators/current-user.decorator';

import {
  CreatePropertyDto
} from './dto/create-property.dto';

import {
  UpdatePropertyDto
} from './dto/update-property.dto';

@ApiTags('Properties')
@Controller('properties')
export class PropertyController {

  constructor(
    private propertyService: PropertyService
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: CreatePropertyDto,
    @CurrentUser() user: any,
  ) {
    return this.propertyService.create(
      dto,
      user.id,
    );
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('location') location?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    return this.propertyService.findAll(
      Number(page) || 1,
      Number(limit) || 10,
      location,
      minPrice
        ? Number(minPrice)
        : undefined,
      maxPrice
        ? Number(maxPrice)
        : undefined,
    );
  }

  @ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Get('my-properties')
getMyProperties(
  @CurrentUser() user: any,
) {

  return this.propertyService.getMyProperties(
    user.id,
  );
}

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.propertyService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePropertyDto,
    @CurrentUser() user: any,
  ) {
    return this.propertyService.update(
      id,
      dto,
      user,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/publish')
  publish(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.propertyService.publish(
      id,
      user,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.propertyService.softDelete(
      id,
      user,
    );
  }
}