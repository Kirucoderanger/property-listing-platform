import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ArrayMinSize
} from 'class-validator';

export class CreatePropertyDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  price: number;

  @IsArray()
  @ArrayMinSize(1)
  images: string[];
}