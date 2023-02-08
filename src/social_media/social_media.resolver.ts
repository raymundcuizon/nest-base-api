import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SocialMediaService } from './social_media.service';
import { SocialMedia } from './entities/social_media.entity';
import { CreateSocialMediaInput } from './dto/create-social_media.input';
import { UpdateSocialMediaInput } from './dto/update-social_media.input';

@Resolver()
export class SocialMediaResolver {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Mutation(() => SocialMedia)
  createSocialMedia(@Args('createSocialMediaInput') createSocialMediaInput: CreateSocialMediaInput) {
    return this.socialMediaService.create(createSocialMediaInput);
  }

  @Query(() => [SocialMedia], { name: 'getAllSocialMedia' })
  findAll() {
    return this.socialMediaService.findAll();
  }

  @Query(() => SocialMedia, { name: 'socialMedia' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.socialMediaService.findOne(id);
  }

  @Mutation(() => SocialMedia)
  updateSocialMedia(@Args('updateSocialMediaInput') updateSocialMediaInput: UpdateSocialMediaInput) {
    return this.socialMediaService.update(updateSocialMediaInput);
  }

  @Mutation(() => SocialMedia, { name: 'deleteSocialMedia' })
  removeSocialMedia(@Args('pk', { type: () => String }) pk: string, @Args('sk', { type: () => String }) sk: string) {
    return this.socialMediaService.remove(pk,sk);
  }
}
