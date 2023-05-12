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

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://quynguyen:J1q55fVc6W2hsiSr@social.mx7nvwb.mongodb.net/test',
      {
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          connection.plugin(require('mongoose-paginate-v2'));
          return connection;
        },
      },
    ),
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
