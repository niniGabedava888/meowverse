import { IsEmail } from 'class-validator';

export class RegisterResponseDto {
  accessToken: string;
  user: {
    id: number;
    email: string;
    createdAt: Date;
  };
}
