import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';

import {
  PrismaService
} from '../prisma/prisma.service';

import {
  CreatePropertyDto
} from './dto/create-property.dto';

import {
  UpdatePropertyDto
} from './dto/update-property.dto';

import {
  PropertyStatus,
  Role
} from '@prisma/client';

@Injectable()
export class PropertyService {

  constructor(
    private prisma: PrismaService
  ) {}

  async getMyProperties(
  userId: string,
) {

  return this.prisma.property.findMany({
    where: {
      ownerId: userId,
      deletedAt: null,
    },

    include: {
      images: true,
    },

    orderBy: {
      createdAt: 'desc',
    },
  });
}

  async create(
    dto: CreatePropertyDto,
    userId: string,
  ) {

    return this.prisma.property.create({
      data: {
        title: dto.title,
        description: dto.description,
        location: dto.location,
        price: dto.price,

        ownerId: userId,

        images: {
          create: dto.images.map(url => ({
            url,
          })),
        },
      },

      include: {
        images: true,
      },
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    location?: string,
    minPrice?: number,
    maxPrice?: number,
  ) {

    const skip = (page - 1) * limit;

    return this.prisma.property.findMany({
      where: {
        deletedAt: null,
        status: PropertyStatus.PUBLISHED,

        ...(location && {
          location: {
            contains: location,
            mode: 'insensitive',
          },
        }),

        ...(minPrice && {
          price: {
            gte: minPrice,
          },
        }),

        ...(maxPrice && {
          price: {
            lte: maxPrice,
          },
        }),
      },

      include: {
        images: true,
      },

      skip,
      take: limit,

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {

    const property =
      await this.prisma.property.findFirst({
        where: {
          id,
          deletedAt: null,
        },

        include: {
          images: true,
          owner: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

    if (!property) {
      throw new NotFoundException(
        'Property not found'
      );
    }

    return property;
  }

  async update(
  id: string,
  dto: UpdatePropertyDto,
  user: any,
) {

  const property =
    await this.findOne(id);

  if (
    property.ownerId !== user.id &&
    user.role !== Role.ADMIN
  ) {
    throw new ForbiddenException(
      'Not allowed'
    );
  }

  if (
    property.status ===
    PropertyStatus.PUBLISHED
  ) {
    throw new ForbiddenException(
      'Published properties cannot be edited'
    );
  }

  const {
    images,
    ...propertyData
  } = dto;

  return this.prisma.property.update({
    where: { id },

    data: {

      ...propertyData,

      ...(images && {
        images: {

          deleteMany: {},

          create: images.map(url => ({
            url,
          })),
        },
      }),
    },

    include: {
      images: true,
    },
  });
}

  async publish(
    id: string,
    user: any,
  ) {

    const property =
      await this.findOne(id);

    if (
      property.ownerId !== user.id &&
      user.role !== Role.ADMIN
    ) {
      throw new ForbiddenException(
        'Not allowed'
      );
    }

    if (
      property.images.length === 0
    ) {
      throw new ForbiddenException(
        'Property requires images'
      );
    }

    return this.prisma.$transaction(
      async (tx) => {

        return tx.property.update({
          where: { id },

          data: {
            status:
              PropertyStatus.PUBLISHED,
          },
        });
      },
    );
  }

  async softDelete(
    id: string,
    user: any,
  ) {

    const property =
      await this.findOne(id);

    if (
      property.ownerId !== user.id &&
      user.role !== Role.ADMIN
    ) {
      throw new ForbiddenException(
        'Not allowed'
      );
    }

    return this.prisma.property.update({
      where: { id },

      data: {
        deletedAt: new Date(),
      },
    });
  }
}

