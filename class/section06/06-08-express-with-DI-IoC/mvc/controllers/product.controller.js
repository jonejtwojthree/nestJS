import { CashService } from "./services/cash.service.js";
import { PointService } from "./services/point.service.js";
import { ProductService } from "./services/product.service.js";

export class ProductController {
  cashService;
  productService;

  constructor(cashService, productService) {
    this.cashService = cashService;
    this.productService = productService;
  }

  buyProduct = (req, res) => {
    // 1. 가진돈 검증하는 코드
    // const cashService = new CashService();
    const hasMoney = this.cashService.checkValue();

    // 2. 판매여부 검증하는 코드
    // const productService = new ProductService();
    const isSoldout = this.productService.checkSoldOut();

    // 3. 상품 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send("상품 구매 완료");
    } else {
      res.send("상품 구매 실패");
    }
  };

  refundProduct = (req, res) => {
    // 1. 판매여부 검증하는 코드
    // const productService = new ProductService();
    const isSoldout = this.productService.checkSoldOut();

    // 2. 상품 구매하는 코드})
    if (isSoldout) {
      res.send("상품 환불 완료");
    } else {
      res.send("상품 환불 실패");
    }
  };
}
