import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CatService } from './cat.service';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}
  @Post()
  async createCat(@Body() requestBody: CreateCatDto, @CurrentUser() user: { id: number }) {
    return this.catService.createCat(requestBody, user.id);
  }

  @Get('my-cats')
  async getMyCats(@CurrentUser() user: { id: number }) {
    return this.catService.getMyCats(user.id);
  }

  @Get(':id')
  async getCatById(@CurrentUser() user: { id: number }, @Param('id', ParseIntPipe) catId: number) {
    return this.catService.getMyCat(catId, user.id);
  }

  @Patch(':id')
  async updateCat(
    @Param('id', ParseIntPipe) catId: number,
    @CurrentUser() user: { id: number },
    @Body() updateCatRequest: UpdateCatDto
  ) {
    return this.catService.updateCat(catId, user.id, updateCatRequest);
  }

  @Delete(':id')
  async deleteCat(@Param('id', ParseIntPipe) catId: number, @CurrentUser() user: { id: number }) {
    return this.catService.deleteCat(catId, user.id);
  }
}
