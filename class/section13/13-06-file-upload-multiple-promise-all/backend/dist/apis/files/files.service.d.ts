import { FileUpload } from 'graphql-upload';
export declare class FilesService {
    upload({ files }: IFileServiceUpload): Promise<string[]>;
}
interface IFileServiceUpload {
    files: FileUpload[];
}
export {};
