import { Controller, Get, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { ProductGenre } from './enums/genre';
import { ProductProduction } from './enums/production';
import { JwtAuthGuard } from 'src/auth/jwt.auth.gaurd';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAllAvalible() {
    return this.productsService.findAllAvalible();
  }

  @Get('/genre/:genre')
  findProductByGenre(@Param('genre') genre: ProductGenre) {
    return this.productsService.findProductByGenre(genre);
  }

  @Get('/production/:production')
  findProductByProduction(@Param('production') production: ProductProduction) {
    return this.productsService.findProductByProduction(production);
  }
}
