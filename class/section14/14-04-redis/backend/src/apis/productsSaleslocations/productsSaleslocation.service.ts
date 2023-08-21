import { Injectable } from '@nestjs/common';
import { ProductSaleslocation } from './entities/productSaleslocation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ProductsSaleslocationsService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly productsSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}
  async create({ productSaleslocation }) {
    return this.productsSaleslocationRepository.save({
      ...productSaleslocation,
    });
  }
}
