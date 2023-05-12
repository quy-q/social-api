import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from 'src/modules/api/cms';

// import { AuthenticationModule, UserModule } from '@module-api-cms';

export const SwaggerCms = (app) => {
  const config = new DocumentBuilder()
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .setTitle('CMS API DOCUMENT')
    .setVersion('1.0')
    .build();
  const swagger = SwaggerModule.createDocument(app, config, {
    include: [UserModule],
  });
  SwaggerModule.setup('backend', app, swagger);
};
