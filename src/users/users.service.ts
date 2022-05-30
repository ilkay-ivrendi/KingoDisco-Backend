import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.input';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.input';

@Injectable()
export class UsersService {
    constructor(@Inject('USER_MODEL') private userModel: Model<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        createdUser.userID = uuidv4();
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find();
    }

    async findOne(usersFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne(usersFilterQuery);
    }

    async update(userID: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userModel.findOneAndUpdate({ userID }, updateUserDto, { new: true });
    }

    async remove(userID: string) {
        return this.userModel.deleteOne({ userID });
    }
}
