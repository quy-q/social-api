import {
  UserModule,
  PostModule,
  LikeModule,
  CommentModule,
  ChattingModule,
  UploadModule,
  AuthenticationModule,
  OrderModule,
  ProductCategoryModule,
  ProductModule,
} from 'src/modules/api/client';
import { FollowingModule } from 'src/modules/api/client/following/following.module';
import { RecommentModule } from 'src/modules/api/client/recomment/recomment.module';

export const ClientRouteApi = [
  {
    path: 'authentication',
    module: AuthenticationModule,
  },
  {
    path: 'upload',
    module: UploadModule,
  },
  {
    path: 'user',
    module: UserModule,
  },
  {
    path: 'post',
    module: PostModule,
  },
  {
    path: 'like',
    module: LikeModule,
  },
  {
    path: 'comment',
    module: CommentModule,
  },
  {
    path: 'chatting',
    module: ChattingModule,
  },
  {
    path: 're-comment',
    module: RecommentModule,
  },
  {
    path: 'follwing',
    module: FollowingModule,
  },
  {
    path: 'product',
    module: ProductModule,
  },
  {
    path: 'product-category',
    module: ProductCategoryModule,
  },
  {
    path: 'order',
    module: OrderModule,
  },
];
