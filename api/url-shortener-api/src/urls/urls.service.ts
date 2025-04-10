import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Url } from './urls.entity';

export interface UrlParam {
  id?: number;
  full?: string;
  minified?: string;
}

export interface CreateUrl {
  full: string;
  minified: string;
}

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url)
    private UrlsRepository: Repository<Url>,
  ) {}

  create(data: CreateUrl): Promise<InsertResult> {
    const url = this.UrlsRepository.create(data);
    return this.UrlsRepository.insert(url);
  }

  findAll(): Promise<Url[]> {
    return this.UrlsRepository.find();
  }

  findOne(id: number): Promise<Url | null> {
    return this.UrlsRepository.findOneBy({ id });
  }

  findBy(data: UrlParam): Promise<Url | null> {
    return this.UrlsRepository.findOneBy(data);
  }

  async remove(id: number): Promise<void> {
    await this.UrlsRepository.delete(id);
  }
}
