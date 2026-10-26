import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('/me')
  async getMe(@CurrentUser() user: { id: number }) {
    return await this.usersService.findUserById(user.id);
  }
}
