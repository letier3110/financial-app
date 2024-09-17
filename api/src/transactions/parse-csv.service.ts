import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import * as csv from 'csv-parser';

@Injectable()
export class ParseCsvService {
  static parse<T>(buffer: Buffer): Promise<T[]> {
    const results: T[] = [];
    return new Promise((resolve, reject) => {
      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);

      return readableStream
        .pipe(csv())
        .on('data', (data: T) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }
}
