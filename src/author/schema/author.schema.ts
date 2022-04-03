import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Book } from 'src/book/schema/book.schema';

@ObjectType()
export class Author {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [Book])
  books: Book[];
}
