import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInputType {
  @Field(() => Int, { nullable: true })
  take: number;

  @Field(() => Int, { nullable: true })
  skip: number;
}
