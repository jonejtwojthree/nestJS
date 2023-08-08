import { ProductCategory } from '../../productsCategories/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocation.entity';
import { User } from 'src/apis/users/entities/use.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    isSoldout: boolean;
    productSaleslocation: ProductSaleslocation;
    productCategory: ProductCategory;
    user: User;
    productTags: ProductTag[];
    deletedAt: Date;
}
