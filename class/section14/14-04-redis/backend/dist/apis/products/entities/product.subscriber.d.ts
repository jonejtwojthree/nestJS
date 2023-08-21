import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductSubscriber implements EntitySubscriberInterface {
    constructor(dataSource: DataSource);
    listenTo(): typeof Product;
    afterInsert(event: InsertEvent<any>): void | Promise<any>;
}
