import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';
import * as dotenv from 'dotenv';

@Injectable()
export class FilesService {
  async upload({ file }: IFileServiceUpload): Promise<string> {
    console.log(file);

    // 1. 파일을 클라우드 스토리지에서 받아옴

    // 1-1 스토리지 세팅하기
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEYFILENAME,
    }).bucket(process.env.BUCKET);

    // 1-2 스토리지에 파일 올리기
    await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.file('1234.png').createWriteStream())
        .on('finish', () => {
          console.log('성공');
          resolve('성공');
        })
        .on('error', () => {
          console.log('실패');
          reject('실패');
        });
    });

    console.log('파일 전송이 완료되었습니다.');
    return '끝';
  }
}

interface IFileServiceUpload {
  file: FileUpload;
}
