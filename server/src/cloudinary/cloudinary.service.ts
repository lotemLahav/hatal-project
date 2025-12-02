/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = v2.uploader.upload_stream(
        {
          folder: 'my-app-photos', // Optional: organize in folders
          transformation: [
            { width: 1000, height: 1000, crop: 'limit' }, // Max dimensions
            { quality: 'auto' }, // Auto quality
            { fetch_format: 'auto' }, // Auto format (WebP when supported)
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          if (result) {
            resolve(result);
          }
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string): Promise<any> {
    return v2.uploader.destroy(publicId);
  }

  getTransformedUrl(publicId: string, width: number, height: number): string {
    return v2.url(publicId, {
      width,
      height,
      crop: 'fill',
      quality: 'auto',
      fetch_format: 'auto',
    });
  }
}
