import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags
} from '@nestjs/swagger';

import { FavoriteService }
from './favorite.service';

import { JwtAuthGuard }
from '../auth/guards/jwt-auth.guard';

import { CurrentUser }
from '../auth/decorators/current-user.decorator';

@ApiTags('Favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoriteController {

  constructor(
    private favoriteService: FavoriteService
  ) {}

  @Post(':propertyId')
  addFavorite(
    @Param('propertyId')
    propertyId: string,

    @CurrentUser() user: any,
  ) {

    return this.favoriteService.addFavorite(
      propertyId,
      user.id,
    );
  }

  @Delete(':propertyId')
  removeFavorite(
    @Param('propertyId')
    propertyId: string,

    @CurrentUser() user: any,
  ) {

    return this.favoriteService.removeFavorite(
      propertyId,
      user.id,
    );
  }

  @Get()
  getFavorites(
    @CurrentUser() user: any,
  ) {

    return this.favoriteService.getUserFavorites(
      user.id,
    );
  }
}
