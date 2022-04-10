import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { Author } from 'src/author/schema/author.schema';
import { AuthorService } from 'src/author/author.service';
import { PaginationInputType } from '../dtos/pagination.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
  ) {}

  @Query(() => [Book], { name: 'findAllBooks', nullable: true })
  findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationInputType,
  ) {
    return this.bookService.findAll(pagination?.take, pagination?.skip);
  }

  @Query(() => Book, { name: 'findBookById', nullable: true })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.bookService.findById(id);
  }

  @ResolveField(() => Author)
  author(@Parent() book: Book) {
    return this.authorService.findById(book.author);
  }
}
