import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsModule } from './ingredient/ingredient.module';
import { InstructionsModule } from './instruction/instruction.module';
import { AuthModule } from './auth/auth.module';
import { CommunitiesModule } from './communities/communities.module';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comment/comment.module';
import { SubCommentModule } from './sub-comment/sub-comment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { Ingredient } from './ingredient/ingredient.entity';
import { Instruction } from './instruction/instruction.entity';
import { Community } from './communities/community.entity';
import { Comment } from './comment/comment.entity';
import { Post } from './posts/post.entity';
import { Recipe } from './recipe/recipe.entity';
import { SubComment } from './sub-comment/sub-comment.entity';

@Module({
  imports: [
    RecipeModule,
    UsersModule,
    IngredientsModule,
    InstructionsModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: ".env",
    }),

    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:async (configService : ConfigService)=>({
      type: 'postgres',
      url: configService.get<string>('DATABASE_URL'),
      entities: [User,Ingredient,Instruction,Community,Comment,Post,Recipe, SubComment] ,
      synchronize: false,
    }),
      inject:[ConfigService]
    }),

    AuthModule,

    CommunitiesModule,

    PostsModule,

    CommentModule,

    SubCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
