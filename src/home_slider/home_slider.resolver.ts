import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HomeSliderService } from './home_slider.service';
import { HomeSlider } from './entities/home_slider.entity';
import { CreateHomeSliderInput } from './dto/create-home_slider.input';
import { UpdateHomeSliderInput } from './dto/update-home_slider.input';
import { HomeSliderS3Presigned } from './entities/home_slider_s3_presigned.entity';
import { DeleteHomeSliderInput } from './dto/delete-home_slider.input copy';
import { UpdateHomeSliderVisibilityInput } from './dto/update-home_slider-visibility.input';

@Resolver(() => HomeSlider)
export class HomeSliderResolver {
  constructor(private readonly homeSliderService: HomeSliderService) {}

  @Mutation(() => HomeSlider)
  createHomeSlider(@Args('createHomeSliderInput') createHomeSliderInput: CreateHomeSliderInput) {
    return this.homeSliderService.create(createHomeSliderInput);
  }

  @Query(() => [HomeSlider], { name: 'getAllHomeSlider' })
  findAll() {
    return this.homeSliderService.findAll();
  }

  // @Query(() => HomeSlider, { name: 'homeSlider' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.homeSliderService.findOne(id);
  // }

  @Query(() => HomeSliderS3Presigned, {name: 'homeSliderS3Presigned'})
  generateAwsPreSignedURL(@Args('fileType', { type: () => String }) fileType: string){
    return this.homeSliderService.generateAwsPreSignedURL(fileType)
  }

  @Mutation(() => Boolean, {name:"UpdateVisibility"})
  updateHomeSlider(@Args('UpdateHomeSliderVisibilityInput') updateHomeSliderVisibilityInput: UpdateHomeSliderVisibilityInput) {
    return this.homeSliderService.update(updateHomeSliderVisibilityInput);
  }

  @Mutation(() => Boolean, {name: "removeHomeSliderImage"})
  removeHomeSlider(@Args('sk', { type: () => String }) sk: string) {
    return this.homeSliderService.remove(sk);
  }
}
