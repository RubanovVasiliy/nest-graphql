import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Author } from 'src/author/schema/author.schema';

@ObjectType()
export class Book {
  @Field(() => ID)
  _id: number;

  @Field()
  title: string;

  @Field(() => Int)
  year: number;

  @Field()
  isbn: string;

  @Field(() => Author)
  author: number;
}
