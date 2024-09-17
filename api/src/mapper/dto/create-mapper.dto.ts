import { Type } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class MapperItemDto {
  @IsString()
  placcount: string;

  @IsString()
  bestPracticeName: string;
}

export class AccountItemsDto {
  @IsNotEmpty()
  @Type(() => MapperItemDto)
  items: MapperItemDto[];
}
