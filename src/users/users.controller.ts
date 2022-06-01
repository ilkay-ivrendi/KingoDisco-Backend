import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserDto } from './dto/update-user.input';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Get('/user/')
    async findWithUsername(@Query('username') username: string): Promise<string> {
        console.log(username);
        return `This actioun should return a #${username} named user`;
    }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get('/:userID')
    async findOne(@Param('userID') userID: string): Promise<User> {
        console.log('userid called!', userID);
        return await this.usersService.findOne({ userID });
    }

    @Patch('/:userID')
    async update(@Param('userID') userID: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.update(userID, updateUserDto);
    }

    @Delete('/:userID')
    async remove(@Param('userID') userID: string) {
        return await this.usersService.remove(userID);
    }

}
