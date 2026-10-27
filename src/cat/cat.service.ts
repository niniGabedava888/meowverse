import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/core/database/database.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createCat(createCatRequest: CreateCatDto, userId: number) {
    const { birthDate, ...catData } = createCatRequest;

    return this.databaseService.cat.create({
      data: {
        ...catData,
        ...(birthDate && { birthDate: new Date(birthDate) }),
        ownerId: userId,
      },
    });
  }

  async getMyCats(userId: number) {
    return this.databaseService.cat.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  async getMyCat(userId: number, catId: number) {
    await this.findCatById(catId, userId);
  }

  async updateCat(catId: number, userId: number, updateCatRequest: UpdateCatDto) {
    await this.findCatById(catId, userId);

    const { birthDate, ...catData } = updateCatRequest;

    return this.databaseService.cat.update({
      where: { id: catId },
      data: {
        ...catData,
        ...(birthDate !== undefined && {
          birthDate: birthDate === null ? null : new Date(birthDate),
        }),
      },
    });
  }

  async deleteCat(catId: number, userId: number) {
    await this.findCatById(catId, userId);

    return this.databaseService.cat.delete({
      where: {
        id: catId,
      },
    });
  }

  private async findCatById(catId: number, userId: number) {
    const cat = await this.databaseService.cat.findFirst({
      where: {
        id: catId,
        ownerId: userId,
      },
    });

    if (!cat) {
      throw new NotFoundException('Cat with this ID does not exist');
    }

    return cat;
  }
}
