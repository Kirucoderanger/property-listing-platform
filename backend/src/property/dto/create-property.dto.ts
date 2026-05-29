import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl
} from 'class-validator';

import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export class CreatePropertyDto {

  @ApiProperty({
    example: 'Luxury Apartment'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Beautiful apartment in city center'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Addis Ababa'
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 5000
  })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg'
    ]
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUrl({}, { each: true })
  images: string[];
}