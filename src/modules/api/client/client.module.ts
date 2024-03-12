import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { DatingModule } from './dating/dating.module';
import { RecommentModule } from './recomment/recomment.module';
import { ChattingModule } from './chatting/chatting.module';
import { UploadModule } from './upload/upload.module';
import { ConversationModule } from './conversation/conversation.module';
import { FollowingModule } from './following/following.module';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AuthenticationModule,
    UserModule,
    PostModule,
    LikeModule,
    CommentModule,
    DatingModule,
    RecommentModule,
    ChattingModule,
    UploadModule,
    ConversationModule,
    FollowingModule,
    ProductModule,
    ProductCategoryModule,
    OrderModule,
    PaymentModule,
  ],
  providers: [],
  controllers: [],
})
export class ClientModule {}
