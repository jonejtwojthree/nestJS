"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("@google-cloud/storage");
let FilesService = exports.FilesService = class FilesService {
    async upload({ files }) {
        console.log(files);
        const waitedFiles = await Promise.all(files);
        console.log(waitedFiles);
        console.log(waitedFiles);
        const bucket = process.env.BUCKET;
        const storage = new storage_1.Storage({
            projectId: process.env.PROJECT_ID,
            keyFilename: process.env.KEYFILENAME,
        }).bucket(bucket);
        const results = await Promise.all(waitedFiles.map((el) => {
            return new Promise((resolve, reject) => {
                el.createReadStream()
                    .pipe(storage.file(el.filename).createWriteStream())
                    .on('finish', () => {
                    resolve(`${bucket}/${el.filename}`);
                })
                    .on('error', () => {
                    reject('실패');
                });
            });
        }));
        console.log('파일 전송이 완료되었습니다.');
        return results;
    }
};
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
//# sourceMappingURL=files.service.js.map