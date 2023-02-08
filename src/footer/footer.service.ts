import { Injectable } from '@nestjs/common';
import { CreateFooterInput } from './dto/create-footer.input';
import { UpdateFooterInput } from './dto/update-footer.input';

@Injectable()
export class FooterService {
  create(createFooterInput: CreateFooterInput) {
    return 'This action adds a new footer';
  }

  findAll() {
    return `This action returns all footer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} footer`;
  }

  update(id: number, updateFooterInput: UpdateFooterInput) {
    return `This action updates a #${id} footer`;
  }

  remove(id: number) {
    return `This action removes a #${id} footer`;
  }
}
