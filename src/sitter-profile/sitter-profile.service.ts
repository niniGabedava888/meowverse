import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { CreateSitterProfileDto } from './dto/create-sitter-profie.dto';
import { UpdateSitterProfileDto } from './dto/update-sitter-profile.dto';

@Injectable()
export class SitterProfileService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createSitterProfile(createSitterProfileDto: CreateSitterProfileDto, userId: number) {
    const sitterProfile = await this.databaseService.sitterProfile.findUnique({
      where: {
        userId,
      },
    });

    if (sitterProfile) {
      throw new ConflictException('You already have sitter profile');
    }

    return this.databaseService.sitterProfile.create({
      data: {
        userId,
        ...createSitterProfileDto,
      },
    });
  }

  async getMySitterProfile(userId: number) {
    return this.findSitterProfile(userId);
  }

  async updateMySitterProfile(userId: number, updateSitterProfileDto: UpdateSitterProfileDto) {
    await this.findSitterProfile(userId);

    return this.databaseService.sitterProfile.update({
      where: {
        userId,
      },
      data: {
        ...updateSitterProfileDto,
      },
    });
  }

  private async findSitterProfile(userId: number) {
    const sitterProfile = await this.databaseService.sitterProfile.findFirst({
      where: {
        userId,
      },
    });

    if (!sitterProfile) {
      throw new NotFoundException('No such profile found');
    }

    return sitterProfile;
  }
}
