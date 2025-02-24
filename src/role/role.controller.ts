/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@ApiTags('Roles')
@Controller('api/roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'Role created successfully' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'List of roles' })
    findAll() {
        return this.roleService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Role found' })
    @ApiResponse({ status: 404, description: 'Role not found' })
    findOne(@Param('id') id: string) {
        return this.roleService.findOne(Number(id));
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Role updated successfully' })
    @ApiResponse({ status: 404, description: 'Role not found' })
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.update(Number(id), updateRoleDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Role deleted successfully' })
    @ApiResponse({ status: 404, description: 'Role not found' })
    remove(@Param('id') id: string) {
        return this.roleService.remove(Number(id));
    }
}
