import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';
import * as dotenv from 'dotenv';
import { rejects } from 'assert';

@Injectable()
export class FilesService {
  async upload({ files }: IFileServiceUpload): Promise<string[]> {
    console.log(files);

    // 1. 파일을 클라우드 스토리지에서 받아옴
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles);

    console.log(waitedFiles);
    // 1-1 스토리지 세팅하기
    const bucket = process.env.BUCKET;
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEYFILENAME,
    }).bucket(bucket);

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise<string>((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => {
              resolve(`${bucket}/${el.filename}`);
            })
            .on('error', () => {
              reject('실패');
            });
        });
      }),
    );

    console.log('파일 전송이 완료되었습니다.');
    return results;
  }
}

interface IFileServiceUpload {
  files: FileUpload[];
}
