import { PartialType } from '@nestjs/mapped-types';
import { CreateObraDto } from './create-obras.dto';

export class UpdateObraDto extends PartialType(CreateObraDto) {}
