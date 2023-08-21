import { FileUpload } from 'graphql-upload';
export declare class FilesService {
    upload({ file }: IFileServiceUpload): Promise<string>;
}
interface IFileServiceUpload {
    file: FileUpload;
}
export {};
