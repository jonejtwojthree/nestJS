import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
export declare class BoardsResolver {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    fetchBoards(): Board[];
    createBoard(createBoardInput: CreateBoardInput): string;
}
