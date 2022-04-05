import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Book } from 'src/book/schema/book.schema';

@ObjectType()
export class Author {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Book])
  books: Book[];
}
