import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { AuthorService } from 'src/author/author.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [BookResolver, BookService, AuthorService],
  imports: [DatabaseModule],
})
export class BookModule {}
