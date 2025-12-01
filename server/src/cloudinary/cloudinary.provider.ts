import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'duzxokowe',
      api_key: '174116726487174',
      api_secret: 'fn4jRfTgjUPIGj6lQvazjx380OA',
    });
  },
};
