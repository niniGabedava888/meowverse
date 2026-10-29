import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateSitterProfileDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  @Transform(({ value }) => value.trim())
  bio: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Transform(({ value }) => value.trim())
  city: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => value?.trim())
  address?: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(80)
  experienceInYears: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100000)
  hourlyRate?: number;
}
