import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
} from './interfaces/products-service.interface';
import { UpdateProductInput } from './dto/update-product.input';
import {
  IProductsServiceUpdate,
  IproductServuceCheckSoldout,
} from './interfaces/products-service.interface';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocation.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly productsSaleslocations: ProductsSaleslocationsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }
  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 상품 하나만 등록할 때 사용하는 방법
    // const result = this.productsRepository.save({
    //   ...createProductInput,
    //   name: '마우스',
    //   description: '굿 마우스',
    //   price: 3000,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 방법
    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;

    const result = await this.productsSaleslocations.create({
      productSaleslocation,
    });
    // 서비스를 타고가야 하는 이유는
    // 레포에 여기저기서 직접 접근하면 검증 로직을 통일 시키기 어려움

    const result2 = await this.productsRepository.save({
      ...product,
      productSaleslocation: result,
      productCategory: {
        id: productCategoryId,
      },
    });

    return result2;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    const product = await this.findOne({ productId });

    // 기존 있는 함수 재사용, 로직 통일
    this.checkSoldout({ product });
    // this.productsRepository.create(); // DB 접속이랑 관련 없음. 등록을 위해 빈 껍데기 만듬
    // this.productsRepository.insert(); // 결과를 객체로 못 돌려 받는 등록 방법
    // this.productsRepository.update(); // 결과를 객체로 못 돌려 받는 수정 방법

    const result = this.productsRepository.save({
      ...product,
      ...updateProductInput,
    });
    return result;
  }

  checkSoldout({ product }: IproductServuceCheckSoldout): void {
    if (product.isSoldout) {
      // throw new HttpException('이미 판매 완료된 상품입니다.', HrrpStatus.);
      console.log('Error');
    }
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // // 1. 실제 삭제
    // const result = await this.productsRepository.delete({
    //   id: productId,
    // });
    // return result.affected ? true : false;

    // 2. 소프트 삭제 - isDSeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제 - deletedAt
    // this.productsRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productsRepository.softRemove({ id: productId });

    //5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}

interface IProductsServiceDelete {
  productId: string;
}
