import {
  Controller,
  HttpStatus,
  Post,
  Res,
  Get,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  editFileName,
  imageFileFilter,
  videoFileFilter,
} from '../../../../common/filters/image-upload.filter';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guard';

@ApiTags('File Uploads')
@Controller({
  version: '1',
})
@ApiResponse({
  status: 401,
  description: 'Authorization Fail',
})
@ApiBearerAuth()
export class UploadController {
  @ApiOperation({ summary: 'Get image' })
  @Get('image/:imgpath')
  async seeUploadedFileImage(
    @Param('imgpath') imgpath: string,
    @Res() response,
  ) {
    const data = await response.sendFile(imgpath, {
      root: './uploads/default',
    });
    return data;
  }

  @ApiOperation({ summary: 'Get video' })
  @Get('video/:videopath')
  async seeUploadedFileVideo(
    @Param('videopath') videopath: string,
    @Res() response,
  ) {
    const data = await response.sendFile(videopath, {
      root: './uploads/video',
    });
    return data;
    // const data = await res.sendFile(videopath, { root: './uploads/video' });
    // const file = createReadStream(join(process.cwd(), 'package.json'));
    // return new StreamableFile(file);
  }
  /**
   *
   * @param file
   * @param response
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Upload Single Image' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          description: 'Image',
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('single-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/default',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadSingleImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() response,
  ) {
    console.log(file.originalname);
    console.log(__dirname);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'image is successfully created',
      data: `${process.env.IMAGE_API}` + file.filename,
    });
  }

  /**
   *
   * @param files
   * @param response
   */
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Upload Multiple Image' })
  @Post('multiple-image')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          description: 'Image',
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('file', 6, {
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleImage(
    @UploadedFiles() files: Express.Multer.File,
    @Res() response,
  ) {
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'image is successfully created',
      data: files,
    });
  }

  /**
   *
   * @param file
   * @param response
   */
  @ApiOperation({ summary: 'Upload Single Video' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          description: 'Video',
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('single-video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/video',
        filename: editFileName,
      }),
      fileFilter: videoFileFilter,
    }),
  )
  async uploadSingleVideo(
    @UploadedFile() file: Express.Multer.File,
    @Res() response,
  ) {
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'video is successfully created',
      data: `${process.env.VIDEO_API}` + file.filename,
    });
  }
}
