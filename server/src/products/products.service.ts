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

  findProductByGenre(genre: ProductGenre) {
    return this.productRepository.find({ where: { genre, is_avalible: true } });
  }

  findProductByProduction(production: ProductProduction) {
    return this.productRepository.find({ where: { production, is_avalible: true } });
  }

  updateRemove(product: Product) {
    return this.productRepository.update(
      { id: product.id },       
      { is_avalible: false }    
    );
  }

  makeProductAvalible(product: Product) {
    return this.productRepository.update(
      { id: product.id },       
      { is_avalible: true }    
    );
  }
}
