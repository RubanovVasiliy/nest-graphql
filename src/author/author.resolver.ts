import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './schema/author.schema';
import { PaginationInputType } from 'src/dtos/pagination.input';
import { BookService } from 'src/book/book.service';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private readonly bookService: BookService,
  ) {}

  @Query(() => [Author], { name: 'findAllAuthors', nullable: true })
  findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationInputType,
  ) {
    return this.authorService.findAll(pagination?.take, pagination?.skip);
  }

  @Query(() => Author, { name: 'findAuthorById', nullable: true })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.authorService.findById(id);
  }

  @ResolveField()
  async books(@Parent() author: Author) {
    return this.bookService.findByAuthorId(author._id);
  }
}
