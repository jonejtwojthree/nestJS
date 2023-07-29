import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { IProductsServiceCreate, IProductsServiceFindOne } from './interfaces/products-service.interface';
import { IProductsServiceUpdate, IproductServuceCheckSoldout } from './interfaces/products-service.interface';
export declare class ProductsService {
    private readonly productsRepository;
    constructor(productsRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne({ productId }: IProductsServiceFindOne): Promise<Product>;
    create({ createProductInput }: IProductsServiceCreate): Promise<Product>;
    update({ productId, updateProductInput, }: IProductsServiceUpdate): Promise<Product>;
    checkSoldout({ product }: IproductServuceCheckSoldout): void;
    delete({ productId }: IProductsServiceDelete): Promise<boolean>;
}
interface IProductsServiceDelete {
    productId: string;
}
export {};
