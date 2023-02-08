import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FooterService } from './footer.service';
import { Footer } from './entities/footer.entity';
import { CreateFooterInput } from './dto/create-footer.input';
import { UpdateFooterInput } from './dto/update-footer.input';

@Resolver(() => Footer)
export class FooterResolver {
  constructor(private readonly footerService: FooterService) {}

  @Mutation(() => Footer)
  createFooter(@Args('createFooterInput') createFooterInput: CreateFooterInput) {
    return this.footerService.create(createFooterInput);
  }

  @Query(() => [Footer], { name: 'footer' })
  findAll() {
    return this.footerService.findAll();
  }

  @Query(() => Footer, { name: 'footer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.footerService.findOne(id);
  }

  @Mutation(() => Footer)
  updateFooter(@Args('updateFooterInput') updateFooterInput: UpdateFooterInput) {
    return this.footerService.update(updateFooterInput.id, updateFooterInput);
  }

  @Mutation(() => Footer)
  removeFooter(@Args('id', { type: () => Int }) id: number) {
    return this.footerService.remove(id);
  }
}
