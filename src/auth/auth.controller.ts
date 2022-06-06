import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return req.user._doc;
    }

}