import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';
import * as dotenv from 'dotenv';

@Injectable()
export class FilesService {
  async upload({ files }: IFileServiceUpload): Promise<string[]> {
    console.log(files);

    // 1. 파일을 클라우드 스토리지에서 받아옴
    const waitedFiles = [];
    waitedFiles[0] = await files[0];
    waitedFiles[1] = await files[1];

    console.log(waitedFiles);
    // 1-1 스토리지 세팅하기
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEYFILENAME,
    }).bucket(process.env.BUCKET);

    // 1-2 스토리지에 파일 올리기
    const results = [];
    for (let i = 0; i < waitedFiles.length; i++) {
      results[i] = await new Promise((resolve, reject) => {
        waitedFiles[i]
          .createReadStream()
          .pipe(storage.file(waitedFiles[i].filename).createWriteStream())
          .on('finish', () => {
            resolve('성공');
          })
          .on('error', () => {
            reject('실패');
          });
      });
    }

    console.log('파일 전송이 완료되었습니다.');
    return ['끝', '끝'];
  }
}

interface IFileServiceUpload {
  files: FileUpload[];
}
