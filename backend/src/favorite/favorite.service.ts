import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { PrismaService }
from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {

  constructor(
    private prisma: PrismaService
  ) {}

  async addFavorite(
    propertyId: string,
    userId: string,
  ) {

    const property =
      await this.prisma.property.findFirst({
        where: {
          id: propertyId,
          deletedAt: null,
        },
      });

    if (!property) {
      throw new NotFoundException(
        'Property not found'
      );
    }

    const existingFavorite =
      await this.prisma.favorite.findUnique({
        where: {
          userId_propertyId: {
            userId,
            propertyId,
          },
        },
      });

    if (existingFavorite) {
      throw new BadRequestException(
        'Property already favorited'
      );
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        propertyId,
      },

      include: {
        property: {
          include: {
            images: true,
          },
        },
      },
    });
  }

  async removeFavorite(
    propertyId: string,
    userId: string,
  ) {

    const favorite =
      await this.prisma.favorite.findUnique({
        where: {
          userId_propertyId: {
            userId,
            propertyId,
          },
        },
      });

    if (!favorite) {
      throw new NotFoundException(
        'Favorite not found'
      );
    }

    await this.prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    return {
      message:
        'Favorite removed successfully',
    };
  }

  async getUserFavorites(
    userId: string,
  ) {

    return this.prisma.favorite.findMany({
      where: {
        userId,
      },

      include: {
        property: {
          include: {
            images: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}