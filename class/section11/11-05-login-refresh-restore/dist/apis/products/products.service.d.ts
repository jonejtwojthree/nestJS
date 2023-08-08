import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { IProductsServiceCreate, IProductsServiceFindOne } from './interfaces/products-service.interface';
import { IProductsServiceUpdate, IproductServuceCheckSoldout } from './interfaces/products-service.interface';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocation.service';
import { ProductsTagsService } from '../productsTags/productsTags.service';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly productsSaleslocations;
    private readonly productTagsService;
    constructor(productsRepository: Repository<Product>, productsSaleslocations: ProductsSaleslocationsService, productTagsService: ProductsTagsService);
    findAll(): Promise<Product[]>;
    findOne({ productId }: IProductsServiceFindOne): Promise<Product>;
    create({ createProductInput, }: IProductsServiceCreate): Promise<Product>;
    update({ productId, updateProductInput, }: IProductsServiceUpdate): Promise<void>;
    checkSoldout({ product }: IproductServuceCheckSoldout): void;
    delete({ productId }: IProductsServiceDelete): Promise<boolean>;
}
interface IProductsServiceDelete {
    productId: string;
}
export {};
