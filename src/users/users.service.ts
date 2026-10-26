import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findUserById(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id: id,
      },
      select: { id: true, name: true, email: true, surname: true, profilePhotoUrl: true },
    });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }
}
