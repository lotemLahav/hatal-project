import { BadRequestException, Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.gaurd';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';
import { OrderStatus } from 'src/orders/enums/status';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), AdminGuard)
export class AdminController {
    constructor(private readonly orderService: OrdersService,
        private productService: ProductsService,
        private cloudinaryService: CloudinaryService) { }

    @Get('/orders')
    getAllOrders() {
        return this.orderService.findAll();
    };

    @Get('/products')
    getAllProducts() {
        return this.productService.findAll();
    };

    @Post('products')
    async createProduct(@Body() body: any) {
        if (!body.image) {
            throw new BadRequestException('Image is required');
        }

        try {
            const base64Data = body.image.split(',')[1]; 
            const buffer = Buffer.from(base64Data, 'base64');

            //create file to send to the cloud
            const file = {
                buffer: buffer,
                originalname: `${body.name}.jpg`,
                mimetype: 'image/jpeg'
            } as Express.Multer.File;

            const uploadResult = await this.cloudinaryService.uploadImage(file);

            //create the product
            const newProduct = {
                name: body.name,
                genre: body.genre,
                production: body.production,
                description: body.description,
                price: body.price,
                duration: body.duration,
                image_url: uploadResult.secure_url,
                image_name: uploadResult.public_id,
                is_avalible: true
            };

            return await this.productService.create(newProduct);
        } catch (error) {
            console.error(error);
            throw new BadRequestException('Failed to upload image or create product');
        }
    }

    @Patch('/products')
    async deleteProduct(@Body() product: Product) {
        return await this.productService.updateRemove(product);
    };

    @Patch('/products/avalible')
    async makeProductAvalible(@Body() product: Product) {
        return await this.productService.makeProductAvalible(product);
    }

    @Patch('orders/:id')
    async updateStatus(
        @Param('id') id: number,
        @Body() body: { status: string }
    ) {
        this.orderService.updateStatus(id, body.status as OrderStatus);
    };
}