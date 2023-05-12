import { Routes } from '@nestjs/core';

import { ClientModule } from 'src/modules/api/client/client.module';
import { UserModule } from 'src/modules/api/cms';
import { BackendModule } from 'src/modules/api/cms/backend.module';

export const BackendRouteApi = [
  {
    path: 'user',
    module: UserModule,
  },
];
