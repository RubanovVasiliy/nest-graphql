import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  isbn: string;

  @Field(() => Int)
  author: number;
}
