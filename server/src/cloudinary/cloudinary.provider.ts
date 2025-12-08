import { v2 } from 'cloudinary';
import { CLOUDINARY, CLOUD_NAME, API_KEY, API_SECRET } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });
  },
};
