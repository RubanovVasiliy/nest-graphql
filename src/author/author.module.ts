import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { BookService } from 'src/book/book.service';

@Module({
  providers: [AuthorResolver, AuthorService, BookService],
})
export class AuthorModule {}
