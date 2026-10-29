import { Module } from '@nestjs/common';
import { SitterProfileController } from './sitter-profile.controller';
import { SitterProfileService } from './sitter-profile.service';

@Module({
  controllers: [SitterProfileController],
  providers: [SitterProfileService],
})
export class SitterProfileModule {}
