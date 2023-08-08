import { ProductTag } from './entities/productTag.entity';
import { Repository } from 'typeorm';
import { IProductTagsServiceBulkInsert, IProductsTagsServiceFindByNames } from './interfaces/products-tags-service.interface';
export declare class ProductsTagsService {
    private readonly productsTagsRepository;
    constructor(productsTagsRepository: Repository<ProductTag>);
    findByNames({ tagNames }: IProductsTagsServiceFindByNames): Promise<ProductTag[]>;
    bulkInsert({ names }: IProductTagsServiceBulkInsert): Promise<import("typeorm").InsertResult>;
}
