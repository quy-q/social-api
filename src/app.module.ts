import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/api/client/user/user.module';
import { AuthenticationModule } from './modules/api/client/authentication/authentication.module';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { JwtAuthGuard } from './common/guard';
import { ClientModule } from './modules/api/client/client.module';
import { ApiRoute } from './router';
import { BackendModule } from './modules/api/cms/backend.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import * as mongooseAutoPopulate from 'mongoose-autopopulate';
import * as mongoosePaginateV2 from 'mongoose-paginate-v2';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.HOST_DATABASE, {
      connectionFactory: (connection) => {
        connection.plugin(mongooseAutoPopulate);
        connection.plugin(mongoosePaginateV2);
        return connection;
      },
    }),
    RouterModule.register(ApiRoute),
    ClientModule,
    BackendModule,
    MulterModule.register({
      dest: '../uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
