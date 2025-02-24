/* eslint-disable prettier/prettier */
// DTOs
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    longDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    imageUrl: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isFeatured: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    slug: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    place: string;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @ApiProperty()
    @IsOptional()
    id?: number;
}
