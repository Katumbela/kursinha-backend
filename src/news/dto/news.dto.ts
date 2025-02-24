/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
    @ApiProperty({ example: 'Título da Notícia' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Descrição curta da notícia' })
    @IsString()
    shortDescription: string;

    @ApiProperty({ example: 'Conteúdo completo da notícia' })
    @IsString()
    content: string;

    @ApiProperty({ example: '2024-02-24T10:00:00Z' })
    @IsDateString()
    postDate: string;

    @ApiProperty({ example: 'Nome do autor' })
    @IsString()
    poster: string;

    @ApiProperty({ example: 'https://example.com' })
    @IsString()
    link: string;

    @ApiProperty({ example: 'noticia-exemplo' })
    @IsString()
    slug: string;

    @ApiProperty({ example: 'https://example.com/image.jpg' })
    @IsString()
    image: string;

    @ApiProperty({ example: true, required: false })
    @IsOptional()
    @IsBoolean()
    sponsor?: boolean;
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
    @ApiProperty({ example: 1 })
    @IsOptional()
    id?: number;
}
