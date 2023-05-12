import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.strategy';
import UserSchema, { User } from '../../../../database/schema/user.schema';
import { UserRepository } from 'src/database/repository';
// import LoginLogSchema from '../../../../database/schemas/log/user/login.log.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService, JwtStrategy, UserRepository],
})
export class AuthenticationModule {}
