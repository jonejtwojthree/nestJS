import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    console.log('a');
  }

  @Query(() => [Board], { nullable: true })
  fetchBoards(): Board[] {
    return this.boardsService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    return this.boardsService.create({ createBoardInput });
  }
}
