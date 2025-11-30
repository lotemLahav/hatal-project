export interface User {
  username: string;
  password: string;
  email: string;
  phone: string;
}

export interface UserAuth {
  username: string;
  password: string;
}

export type GoogleJwtPayload = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
};