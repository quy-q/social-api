import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommentModule } from 'src/modules/api/client/comment/comment.module';
import { FollowingModule } from 'src/modules/api/client/following/following.module';
import { LikeModule } from 'src/modules/api/client/like/like.module';
import { PostModule } from 'src/modules/api/client/post/post.module';
import { RecommentModule } from 'src/modules/api/client/recomment/recomment.module';

import {
  AuthenticationModule,
  ChattingModule,
  UploadModule,
  UserModule,
} from '../../modules/api/client';
import { ProductModule } from 'src/modules/api/client/product/product.module';
import { ProductCategoryModule } from 'src/modules/api/client/product-category/product-category.module';
import { OrderModule } from 'src/modules/api/client/order/order.module';

export const SwaggerClient = (app) => {
  const swagger = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('CLIENT API DOCUMENT')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'access-token',
      )
      .build(),
    {
      include: [
        UploadModule,
        AuthenticationModule,
        UserModule,
        PostModule,
        LikeModule,
        CommentModule,
        ChattingModule,
        RecommentModule,
        FollowingModule,
        ProductModule,
        ProductCategoryModule,
        OrderModule,
      ],
    },
  );
  SwaggerModule.setup('client', app, swagger);
};
