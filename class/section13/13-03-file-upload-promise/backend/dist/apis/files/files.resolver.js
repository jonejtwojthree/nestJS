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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const files_service_1 = require("./files.service");
const graphql_upload_1 = require("graphql-upload");
let FilesResolver = exports.FilesResolver = class FilesResolver {
    constructor(filesService) {
        this.filesService = filesService;
    }
    uploadFile(file) {
        return this.filesService.upload({ file });
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)({ name: 'file', type: () => graphql_upload_1.GraphQLUpload })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof graphql_upload_1.FileUpload !== "undefined" && graphql_upload_1.FileUpload) === "function" ? _a : Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], FilesResolver.prototype, "uploadFile", null);
exports.FilesResolver = FilesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesResolver);
//# sourceMappingURL=files.resolver.js.map