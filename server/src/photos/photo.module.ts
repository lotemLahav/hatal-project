import { Module } from '@nestjs/common';
import { PhotosController } from './photo.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [PhotosController],
})
export class PhotosModule {}
