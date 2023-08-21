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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("@nestjs/typeorm");
const productsSaleslocation_service_1 = require("../productsSaleslocations/productsSaleslocation.service");
const productsTags_service_1 = require("../productsTags/productsTags.service");
let ProductsService = exports.ProductsService = class ProductsService {
    constructor(productsRepository, productsSaleslocations, productTagsService) {
        this.productsRepository = productsRepository;
        this.productsSaleslocations = productsSaleslocations;
        this.productTagsService = productTagsService;
    }
    findAll() {
        return this.productsRepository.find({
            relations: ['productSaleslocation', 'productCategory'],
        });
    }
    findOne({ productId }) {
        return this.productsRepository.findOne({
            where: { id: productId },
            relations: ['productSaleslocation', 'productCategory'],
        });
    }
    async create({ createProductInput, }) {
        const { productSaleslocation, productCategoryId, productTages, ...product } = createProductInput;
        const result = await this.productsSaleslocations.create({
            productSaleslocation,
        });
        const tagNames = productTages.map((el) => el.replace('#', ''));
        const prevTags = await this.productTagsService.findByNames({ tagNames });
        const temp = [];
        tagNames.forEach((el) => {
            const isExists = prevTags.find((prevEl) => el == prevEl.name);
            if (!isExists)
                temp.push({ name: el });
        });
        const newTags = this.productTagsService.bulkInsert({ names: temp });
        const tags = [...prevTags, ...(await newTags).identifiers];
        const result2 = await this.productsRepository.save({
            ...product,
            productSaleslocation: result,
            productCategory: {
                id: productCategoryId,
            },
            productTags: tags,
        });
        return result2;
    }
    async update({ productId, updateProductInput, }) {
        const product = await this.findOne({ productId });
        this.checkSoldout({ product });
    }
    checkSoldout({ product }) {
        if (product.isSoldout) {
            console.log('Error');
        }
    }
    async delete({ productId }) {
        const result = await this.productsRepository.softDelete({ id: productId });
        return result.affected ? true : false;
    }
};
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, productsSaleslocation_service_1.ProductsSaleslocationsService,
        productsTags_service_1.ProductsTagsService])
], ProductsService);
//# sourceMappingURL=products.service.js.map