import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env',
    }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:async (configService: ConfigService)=>({
      global: true,
      secret: configService.get<string>("JWT_SECRET"),
      signOptions: { expiresIn: '86000s' },}),
      inject:[ConfigService]
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
