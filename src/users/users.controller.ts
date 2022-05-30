import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserDto } from './dto/update-user.input';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':userID')
    findOne(@Param('userID') userID: string): Promise<User> {
        return this.usersService.findOne({ userID });
    }

    @Patch(':userID')
    update(@Param('userID') userID: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(userID, updateUserDto);
    }

    @Delete(':userID')
    remove(@Param('userID') userID: string) {
        return this.usersService.remove(userID);
    }
}
