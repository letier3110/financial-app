import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BestPracticeService } from './best-practice.service'; // Service to interact with DB
import { BestPracticeEntity } from './entities/best-practice.entity'; // Entity representing the table
import { parseXlsx } from './parse-xlsx';

@Controller('best-practice')
export class BestPracticeController {
  constructor(private readonly bestPracticeService: BestPracticeService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    if (!file) {
      throw new HttpException('File is missing', HttpStatus.BAD_REQUEST);
    }
    const bestPractices: string[] = (await parseXlsx(file.buffer)) as string[];
    await this.bestPracticeService.bulkCreate(
      bestPractices.map((x) => ({
        id: undefined,
        name: x,
      })),
    );
    return { message: 'Best Practices uploaded successfully' };
  }

  @Get()
  async getAllBestPractices(): Promise<BestPracticeEntity[]> {
    return this.bestPracticeService.findAll();
  }

  @Delete(':id')
  async deleteBestPractice(@Param('id') id: string) {
    const result = await this.bestPracticeService.delete(id);
    if (!result) {
      throw new HttpException('Best Practices not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Best Practices deleted successfully' };
  }
}
