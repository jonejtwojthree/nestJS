import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { IProductsServiceCreate, IProductsServiceFindOne } from './interfaces/products-service.interface';
import { IProductsServiceUpdate, IproductServuceCheckSoldout } from './interfaces/products-service.interface';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocation.service';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly productsSaleslocations;
    constructor(productsRepository: Repository<Product>, productsSaleslocations: ProductsSaleslocationsService);
    findAll(): Promise<Product[]>;
    findOne({ productId }: IProductsServiceFindOne): Promise<Product>;
    create({ createProductInput, }: IProductsServiceCreate): Promise<Product>;
    update({ productId, updateProductInput, }: IProductsServiceUpdate): Promise<Product>;
    checkSoldout({ product }: IproductServuceCheckSoldout): void;
    delete({ productId }: IProductsServiceDelete): Promise<boolean>;
}
interface IProductsServiceDelete {
    productId: string;
}
export {};
