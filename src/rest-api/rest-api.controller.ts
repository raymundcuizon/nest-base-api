import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile,
  UseInterceptors,
  UseGuards, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RestApiService } from './rest-api.service';
import { CreateRestApiDto } from './dto/create-rest-api.dto';
import { UpdateRestApiDto } from './dto/update-rest-api.dto';

import { UploadImageCategory } from './dto/upload-image-category.dto';
import { CongnitoAuthGuard } from 'src/auth/congito.guard';

@Controller('rest-api')
export class RestApiController {
  constructor(private readonly restApiService: RestApiService) {}

  // @UseGuards(CongnitoAuthGuard)
  @Post('/home-slider/image/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImageSlider(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadImageCategory: UploadImageCategory
    ) {
    return this.restApiService.uploadImageSlider(uploadImageCategory,file);
  }

  @Post('/category/portfolio/image/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadPortfolioWithCategory(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadImageCategory: UploadImageCategory
    ) {
    return this.restApiService.uploadCategoryPortfolioImage(uploadImageCategory,file);
  }


  

  @Get()
  findAll() {
    return this.restApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestApiDto: UpdateRestApiDto) {
    return this.restApiService.update(+id, updateRestApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restApiService.remove(+id);
  }
}
