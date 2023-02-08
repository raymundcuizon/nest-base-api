import { Resolver, Query, Mutation, Args, Int, Scalar } from '@nestjs/graphql';
import { AboutMeService } from './about_me.service';
import { AboutMe } from './entities/about_me.entity';
import { CreateAboutMeInput } from './dto/create-about_me.input';
import { UpdateAboutMeInput } from './dto/update-about_me.input';
import * as fs from 'fs/promises';
// import { GraphQLUpload, FileUpload } from 'graphql-upload';



@Resolver(() => AboutMe)
export class AboutMeResolver {
  constructor(private readonly aboutMeService: AboutMeService) {}

  @Mutation(() => AboutMe)
  createAboutMe(@Args('createAboutMeInput') createAboutMeInput: CreateAboutMeInput) {
    return this.aboutMeService.create(createAboutMeInput);
  }

  @Query(() => [AboutMe], { name: 'aboutMe' })
  findAll() {
    return this.aboutMeService.findAll();
  }

  @Query(() => AboutMe, { name: 'getAboutMe' })
  getAboutMe() {
    return this.aboutMeService.getAboutMe();
  }

  @Mutation(() => AboutMe)
  updateAboutMe(@Args('updateAboutMeInput') updateAboutMeInput: UpdateAboutMeInput) {
    return this.aboutMeService.update(updateAboutMeInput.id, updateAboutMeInput);
  }

  @Mutation(() => AboutMe)
  removeAboutMe(@Args('id', { type: () => Int }) id: number) {
    return this.aboutMeService.remove(id);
  }

}
