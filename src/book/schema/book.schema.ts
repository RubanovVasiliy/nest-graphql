import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Author } from 'src/author/schema/author.schema';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  isbn: string;

  @Field(() => Author)
  author: number;
}
