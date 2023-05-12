import { Routes } from '@nestjs/core';

import { ClientModule } from 'src/modules/api/client/client.module';
import { BackendModule } from 'src/modules/api/cms/backend.module';
import { BackendRouteApi } from './backend.router';

import { ClientRouteApi } from './client.router';

export const ApiRoute: Routes = [
  {
    path: 'client',
    module: ClientModule,
    children: ClientRouteApi,
  },
  {
    path: 'cms',
    module: BackendModule,
    children: BackendRouteApi,
  },
];
