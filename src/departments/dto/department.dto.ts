/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class DepartmentDirectorDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    picture: string;
}


export class CreateDepartmentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    catalog_link?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    description?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    slug: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    department_cover?: string;

    @ApiProperty({ type: () => DepartmentDirectorDto })
    @IsNotEmpty()
    departmentDirector: DepartmentDirectorDto;
}

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    id?: number;
}
