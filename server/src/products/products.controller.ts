import { Controller, Get, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { ProductGenre } from './enums/genre';
import { ProductProduction } from './enums/production';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/genre/:genre')
  findProductByGenre(@Param('genre') genre: ProductGenre) {
    return this.productsService.findProductByGenre(genre);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/production/:production')
  findProductByProduction(@Param('production') production: ProductProduction) {
    return this.productsService.findProductByProduction(production);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
