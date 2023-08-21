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
exports.ProductSubscriber = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductSubscriber = exports.ProductSubscriber = class ProductSubscriber {
    constructor(dataSource) {
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return product_entity_1.Product;
    }
    afterInsert(event) {
        console.log(event);
        const id = event.entity.id;
        const name = event.entity.name;
        const description = event.entity.description;
        const price = event.entity.price;
        const isSoldout = event.entity.isSoldout;
        console.log(`${id} ${name} ${description} ${price} ${isSoldout}`);
    }
};
exports.ProductSubscriber = ProductSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ProductSubscriber);
//# sourceMappingURL=product.subscriber.js.map