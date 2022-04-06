import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    BookModule,
    AuthorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
