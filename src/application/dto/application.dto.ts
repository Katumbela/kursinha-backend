/* eslint-disable prettier/prettier */


import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateApplicationDto {
    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'johndoe@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '+244900000000' })
    @IsString()
    @IsNotEmpty()
    phone: string;
    
    @ApiProperty({ example: 'Computer Science' })
    @IsString()
    @IsNotEmpty()
    course: string;

    @ApiProperty({ example: 'AI and Data Science' })
    @IsString()
    @IsNotEmpty()
    interest: string;
}


export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
    @ApiProperty({ example: '1' })
    @IsString()
    @IsNotEmpty()
    id?: number;
}