import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}
