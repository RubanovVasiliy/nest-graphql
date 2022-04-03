import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { CreateBookInput } from './dto/create-book.input';
import { Author } from 'src/author/schema/author.schema';
import { AuthorService } from 'src/author/author.service';
import { PaginationInputType } from './dto/pagination.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
  ) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.bookService.createBook(createBookInput);
  }

  @Query(() => [Book], { name: 'findAllBooks', nullable: true })
  findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationInputType,
  ) {
    return this.bookService.findAll(pagination?.take, pagination?.skip);
  }

  @Query(() => Book, { name: 'findBookById', nullable: true })
  findById(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.findById(id);
  }

  @ResolveField(() => Author)
  async author(@Parent() book: Book) {
    return this.authorService.findById(book.author);
  }
}
