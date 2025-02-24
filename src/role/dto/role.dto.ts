/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRoleDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Some details about John' })
    @IsString()
    @IsNotEmpty()
    about: string;

    @ApiProperty({ example: 'Software Engineer' })
    @IsString()
    @IsNotEmpty()
    role: string;

    @ApiProperty({ example: 'https://cv-link.com/johndoe' })
    @IsString()
    @IsNotEmpty()
    cv: string;

    @ApiProperty({ example: 'https://linkedin.com/in/johndoe', required: false })
    @IsString()
    @IsOptional()
    linkedin?: string;

    @ApiProperty({ example: 'https://x.com/johndoe', required: false })
    @IsString()
    @IsOptional()
    x?: string;

    @ApiProperty({ example: 'https://image-url.com/johndoe.jpg' })
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty({ example: 'director' })
    @IsString()
    @IsNotEmpty()
    team: string;

    @ApiProperty({
        example: [{ title: 'Test Title', description: 'Test Description' }],
        type: Array,
        required: false,
    })
    @IsArray()
    @IsOptional()
    phrases?: { title: string; description: string }[];
}


export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    id: number;
}