import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { BookService } from 'src/book/book.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [AuthorResolver, AuthorService, BookService],
  imports: [DatabaseModule],
})
export class AuthorModule {}
