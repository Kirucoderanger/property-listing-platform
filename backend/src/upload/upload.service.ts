import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import  cloudinary  from './cloudinary.config';

@Injectable()
export class UploadService {

  async uploadImage(
    file: Express.Multer.File,
  ) {

    if (!file) {
      throw new BadRequestException(
        'No file uploaded',
      );
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (
      !allowedTypes.includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException(
        'Invalid file type',
      );
    }

    const result =
      await cloudinary.uploader.upload(
        file.path,
        {
          folder: 'property-platform',
        },
      );

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }
}