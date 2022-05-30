import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    id: number;

    @Prop()
    username: string;

    @Prop()
    email: string;
    
    @Prop()
    password: string;
    
    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    avatar: string;

    @Prop()
    Country: string;
}

export const UserSchema = SchemaFactory.createForClass(User);