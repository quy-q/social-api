import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SharpPipeImage
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: any): Promise<any> {
    const filename = `default-${uuid()}.webp`;
    const thumbnail = `thumb-${uuid()}.webp`;
    await sharp(image.buffer)
      .webp({ effort: 3 })
      .toFile(path.join('./uploads/default', filename));
    await sharp(image.buffer)
      .resize(165, 165)
      .webp({ effort: 3 })
      .toFile(path.join('./uploads/thumbnail', thumbnail));
    return {
      default: filename,
      thumbnail,
    };
  }
}

@Injectable()
export class SharpPipeImages
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(files: any): Promise<any> {
    const data = [];
    files.map(async (image) => {
      const filename = `default-${uuid()}.webp`;
      const thumbnail = `thumb-${uuid()}.webp`;
      data.push({
        default: filename,
        thumbnail,
      });
      await sharp(image.buffer)
        .webp({ effort: 3 })
        .toFile(path.join('./uploads/default', filename));
      await sharp(image.buffer)
        .resize(165, 165)
        .webp({ effort: 3 })
        .toFile(path.join('./uploads/thumbnail', thumbnail));
    });
    return data;
  }
}
