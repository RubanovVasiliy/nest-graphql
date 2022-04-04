import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field(() => ID)
  _id: number;

  @Field()
  title: string;

  @Field(() => Int)
  year: number;

  @Field()
  isbn: string;

  @Field(() => Int)
  author: number;
}
