import { Injectable } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductGenre } from './enums/genre';
import { ProductProduction } from './enums/production';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  create(createProduct: Partial<Product>) {
    const newProduct = this.productRepository.create(createProduct);
    return this.productRepository.save(newProduct);
  }

  findAllAvalible() {
    return this.productRepository.find({ where: { is_avalible: true } });
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  findProductByGenre(genre: ProductGenre) {
    return this.productRepository.find({ where: { genre, is_avalible: true } });
  }

  findProductByProduction(production: ProductProduction) {
    return this.productRepository.find({ where: { production, is_avalible: true } });
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  updateRemove(product: Product) {
    return this.productRepository.update(
      { id: product.id },       
      { is_avalible: false }    
    );
  }
}
