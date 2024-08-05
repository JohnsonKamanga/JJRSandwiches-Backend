import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>){
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Post('validate')
    verify(@Body('access_token')access_token: string){
        return this.authService.verify(access_token);
    }

    @Post('decode')
    async decode(@Body('access_token')access_token : string){
        return await this.authService.decode(access_token);
    }
    
}
