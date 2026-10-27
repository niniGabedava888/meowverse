/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/core/database/database.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import * as argon2 from 'argon2';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService
  ) {}

  async register(requestBody: RegisterRequestDto): Promise<RegisterResponseDto> {
    const { password, email, name, surname } = requestBody;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const existing = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    if (existing) {
      throw new ConflictException('Email is already in use!');
    }

    const passwordHash = await argon2.hash(password);
    const response = await this.databaseService.user.create({
      data: {
        name,
        surname,
        email,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
    const accessToken = this.signJwtToken(response.id, response.email);
    return { accessToken, user: response };
  }

  async login(requestBody: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = requestBody;
    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect!');
    }
    const { passwordHash, ...safeUser } = user;

    const passwordMatches = await argon2.verify(user.passwordHash, password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Email or password is incorrect!');
    }
    const accessToken = this.signJwtToken(user.id, user.email);

    return { accessToken, user: safeUser };
  }

  signJwtToken(id: number, email: string): string {
    const payload = {
      sub: id,
      email,
    };
    return this.jwtService.sign(payload);
  }
}
