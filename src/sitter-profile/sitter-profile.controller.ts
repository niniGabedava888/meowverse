import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { SitterProfileService } from './sitter-profile.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateSitterProfileDto } from './dto/create-sitter-profie.dto';
import { UpdateSitterProfileDto } from './dto/update-sitter-profile.dto';

@Controller('sitter-profile')
export class SitterProfileController {
  constructor(private readonly sitterProfileService: SitterProfileService) {}

  @Post()
  createSitterProfile(
    @CurrentUser() user: { id: number },
    @Body() createSitterProfileDto: CreateSitterProfileDto
  ) {
    return this.sitterProfileService.createSitterProfile(createSitterProfileDto, user.id);
  }

  @Get('me')
  getMySitterProfile(@CurrentUser() user: { id: number }) {
    return this.sitterProfileService.getMySitterProfile(user.id);
  }

  @Patch('me')
  updateMySitterProfile(
    @CurrentUser() user: { id: number },
    @Body() updateSitterProfileDto: UpdateSitterProfileDto
  ) {
    return this.sitterProfileService.updateMySitterProfile(user.id, updateSitterProfileDto);
  }
}
