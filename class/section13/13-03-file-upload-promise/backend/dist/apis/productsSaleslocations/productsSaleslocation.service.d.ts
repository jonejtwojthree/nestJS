import { ProductSaleslocation } from './entities/productSaleslocation.entity';
import { Repository } from 'typeorm';
export declare class ProductsSaleslocationsService {
    private readonly productsSaleslocationRepository;
    constructor(productsSaleslocationRepository: Repository<ProductSaleslocation>);
    create({ productSaleslocation }: {
        productSaleslocation: any;
    }): unknown;
}
