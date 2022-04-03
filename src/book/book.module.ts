import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { AuthorService } from 'src/author/author.service';

@Module({
  providers: [BookResolver, BookService, AuthorService],
})
export class BookModule {}
