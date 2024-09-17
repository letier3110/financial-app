import { Injectable } from '@nestjs/common';
import { MapperEntity } from './entities/mapper.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountItemsDto } from './dto/create-mapper.dto';
// import { CreateMapperDto } from './dto/create-mapper.dto';

@Injectable()
export class MapperService {
  constructor(
    @InjectRepository(MapperEntity)
    private mapperRepo: Repository<MapperEntity>,
  ) {}

  async create(accounts: AccountItemsDto): Promise<MapperEntity[]> {
    const accountEntities = accounts.items.map((account) => {
      const accountEntity = new MapperEntity();
      accountEntity.placcount = account.placcount;
      accountEntity.bestPracticeName = account.bestPracticeName;
      return accountEntity;
    });
    return this.mapperRepo.save(accountEntities);
  }

  async findAll(): Promise<MapperEntity[]> {
    return this.mapperRepo.find();
  }

  async delete(id: string): Promise<boolean> {
    const deleteResult = await this.mapperRepo.delete(id);
    return deleteResult.affected > 0;
  }
}
