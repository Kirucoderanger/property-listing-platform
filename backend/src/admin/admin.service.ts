import { Injectable } from '@nestjs/common';

import { PrismaService }
from '../prisma/prisma.service';

import {
  PropertyStatus
} from '@prisma/client';

@Injectable()
export class AdminService {

  constructor(
    private prisma: PrismaService
  ) {}

  async getMetrics() {

    const totalUsers =
      await this.prisma.user.count();

    const totalProperties =
      await this.prisma.property.count({
        where: {
          deletedAt: null,
        },
      });

    const publishedProperties =
      await this.prisma.property.count({
        where: {
          deletedAt: null,
          status:
            PropertyStatus.PUBLISHED,
        },
      });

    const draftProperties =
      await this.prisma.property.count({
        where: {
          deletedAt: null,
          status:
            PropertyStatus.DRAFT,
        },
      });

    return {
      totalUsers,
      totalProperties,
      publishedProperties,
      draftProperties,
    };
  }
}