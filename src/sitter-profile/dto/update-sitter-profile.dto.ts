import { PartialType } from '@nestjs/mapped-types';
import { CreateSitterProfileDto } from './create-sitter-profie.dto';

export class UpdateSitterProfileDto extends PartialType(CreateSitterProfileDto) {}
