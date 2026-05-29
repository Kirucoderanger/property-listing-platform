import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';

import {
  FileInterceptor,
} from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import { extname } from 'path';

import { JwtAuthGuard }
from '../auth/guards/jwt-auth.guard';

import { UploadService }
from './upload.service';

@ApiTags('Uploads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {

  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @ApiConsumes(
    'multipart/form-data',
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (
          req,
          file,
          cb,
        ) => {
          const filename =
            Date.now() +
            extname(
              file.originalname,
            );

          cb(
            null,
            filename,
          );
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.uploadService.uploadImage(
      file,
    );
  }
}
