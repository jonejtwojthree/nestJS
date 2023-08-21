import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';

// @types/graphql-upload 8.0.12로 직접 바꿈
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @Mutation(() => [String])
  uploadFile(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ): Promise<string[]> {
    return this.filesService.upload({ files });
  }
}
