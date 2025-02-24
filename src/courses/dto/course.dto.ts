/* eslint-disable prettier/prettier */
import { IsInt, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SubjectDto {
    @IsString()
    name: string;

    @IsInt()
    workload: number;
}

class SemesterDto {
    @IsInt()
    semester: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SubjectDto)
    subjects: SubjectDto[];
}

class YearDto {
    @IsInt()
    year: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SemesterDto)
    semesters: SemesterDto[];
}

class ShiftDto {
    @IsOptional()
    @IsInt()
    morning?: boolean;

    @IsOptional()
    @IsInt()
    afternoon?: boolean;

    @IsOptional()
    @IsInt()
    evening?: boolean;
}

export class CreateCourseDto {
    @IsString()
    course: string;

    @IsOptional()
    @IsString()
    short_detail?: string;

    @IsOptional()
    @IsString()
    long_description?: string;

    @IsInt()
    duration: number;

    @IsString()
    level: string;

    @IsString()
    slug: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ShiftDto)
    shift?: ShiftDto;

    @IsOptional()
    @IsString()
    benefits?: string;

    @IsOptional()
    @IsString()
    entryProfile?: string;

    @IsOptional()
    @IsString()
    outProfile?: string;

    @IsString()
    course_cover: string;

    @IsInt()
    departmentId: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => YearDto)
    years?: YearDto[];
}

export class UpdateCourseDto {
    @IsOptional()
    @IsString()
    course?: string;

    @IsOptional()
    @IsString()
    long_description?: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @IsOptional()
    @IsInt()
    duration?: number;

    @IsOptional()
    @IsString()
    level?: string;
}
