"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const productCategory_entity_1 = require("../../productsCategories/entities/productCategory.entity");
const productSaleslocation_entity_1 = require("../../productsSaleslocations/entities/productSaleslocation.entity");
const use_entity_1 = require("../../users/entities/use.entity");
const productTag_entity_1 = require("../../productsTags/entities/productTag.entity");
let Product = exports.Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isSoldout", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => productSaleslocation_entity_1.ProductSaleslocation),
    __metadata("design:type", productSaleslocation_entity_1.ProductSaleslocation)
], Product.prototype, "productSaleslocation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => productCategory_entity_1.ProductCategory),
    __metadata("design:type", productCategory_entity_1.ProductCategory)
], Product.prototype, "productCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => use_entity_1.User),
    __metadata("design:type", use_entity_1.User)
], Product.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => productTag_entity_1.ProductTag, (productTags) => productTags.products),
    __metadata("design:type", Array)
], Product.prototype, "productTags", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
//# sourceMappingURL=product.entity.js.map