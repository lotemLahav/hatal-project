export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  phone: number;
  is_admin?: boolean;
}
