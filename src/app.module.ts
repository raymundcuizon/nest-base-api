import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { HomeSliderModule } from './home_slider/home_slider.module';
import { AboutMeModule } from './about_me/about_me.module';
import { FooterModule } from './footer/footer.module';
import { SocialMediaModule } from './social_media/social_media.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { PortfolioCategoryModule } from './portfolio_category/portfolio_category.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { RestApiModule } from './rest-api/rest-api.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      uploads: false
    }),
    AuthModule,
    HomeSliderModule, 
    AboutMeModule, 
    FooterModule, 
    SocialMediaModule, PortfolioModule, PortfolioCategoryModule, UploadFileModule, RestApiModule
    ,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}


// GraphQLModule.forRoot<ApolloDriverConfig>({
//   driver: ApolloDriver,
//   autoSchemaFile: true,
// }),
