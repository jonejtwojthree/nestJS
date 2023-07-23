import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";

import { CashService } from "./mvc/controllers/services/cash.service.js";
import { ProductService } from "./mvc/controllers/services/product.service.js";
import { PointService } from "./mvc/controllers/services/point.service.js";

const app = express();

// 약한 결합, 매개변수에 주입시키기
// 한번만 new 해서 매개변수로 넘겨버리기(싱글톤 비슷)
const cashService = new CashService();
const pointService = new PointService();
const productService = new ProductService();

// 상품API
const productController = new ProductController(cashService, productService);
app.post("/products/buy", productController.buyProduct); // 상품 구매하기 API
app.post("/products/refund", productController.refundProduct); // 상품 환불하기 API

// 쿠폰(상품권)API
const couponController = new CouponController(pointService);
app.post("/coupons/buy", couponController.buyCoupon); // 쿠폰 구매하기 API

app.listen(3000);
