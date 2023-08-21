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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsCategoriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const productCategory_entity_1 = require("./entities/productCategory.entity");
const productsCategories_service_1 = require("./productsCategories.service");
let ProductsCategoriesResolver = exports.ProductsCategoriesResolver = class ProductsCategoriesResolver {
    constructor(productsCategoriesService) {
        this.productsCategoriesService = productsCategoriesService;
    }
    createProductCategory(name) {
        return this.productsCategoriesService.create({ name });
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => productCategory_entity_1.ProductCategory),
    __param(0, (0, graphql_1.Args)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], ProductsCategoriesResolver.prototype, "createProductCategory", null);
exports.ProductsCategoriesResolver = ProductsCategoriesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [productsCategories_service_1.ProductsCategoriesService])
], ProductsCategoriesResolver);
//# sourceMappingURL=productsCategories.resolver.js.map