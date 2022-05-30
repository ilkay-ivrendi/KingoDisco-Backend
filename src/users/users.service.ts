import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.input';

@Injectable()
export class UsersService {
    constructor(@Inject('USER_MODEL') private userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async update(id, updateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
    }

    async remove(id) {
        return this.userModel.findByIdAndRemove(id).exec();
    }
}
