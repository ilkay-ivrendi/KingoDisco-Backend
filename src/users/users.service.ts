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
        const createdUser = await new this.userModel(createUserDto);
        createdUser.userID = uuidv4();
        createdUser.save();
        console.log("New User Added!", createdUser);
        return createdUser;
    }

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async findOne(usersFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userModel.findOne(usersFilterQuery);
    }

    async findWithUsername(username: string): Promise<User> {
        const reqUser = await this.userModel.findOne({ username }).exec();
        console.log("Find by Username called!");
        return reqUser;
    }

    async update(userID: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userModel.findOneAndUpdate({ userID }, updateUserDto, { new: true });
    }

    async remove(userID: string) {
        return this.userModel.deleteOne({ userID });
    }
}
