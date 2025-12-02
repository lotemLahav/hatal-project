/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  // Upload single photo
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const result = await this.cloudinaryService.uploadImage(file);

    return {
      message: 'Photo uploaded successfully',
      data: {
        publicId: result.public_id,
        url: result.secure_url,
        thumbnail: this.cloudinaryService.getTransformedUrl(
          result.public_id,
          300,
          300,
        ),
      },
    };
  }

  @Delete(':publicId')
  async deletePhoto(@Param('publicId') publicId: string) {
    // Note: publicId from URL will have slashes encoded, decode them
    const decodedPublicId = decodeURIComponent(publicId);
    await this.cloudinaryService.deleteImage(decodedPublicId);

    return {
      message: 'Photo deleted successfully',
    };
  }
}
