import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './schema/author.schema';
import { CreateAuthorInput } from './dto/create-author.input';
import { PaginationInputType } from 'src/book/dto/pagination.input';
import { BookService } from 'src/book/book.service';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private readonly bookService: BookService,
  ) {}

  @Mutation(() => Author)
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return this.authorService.create(createAuthorInput);
  }

  @Query(() => [Author], { name: 'findAllAuthors', nullable: true })
  findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationInputType,
  ) {
    return this.authorService.findAll(pagination.take, pagination.skip);
  }

  @Query(() => Author, { name: 'findAuthorById', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authorService.findById(id);
  }

  @ResolveField()
  async books(@Parent() author: Author) {
    return this.bookService.findByAuthorId(author.id);
  }
}
