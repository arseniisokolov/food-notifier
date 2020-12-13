import { Module } from '@nestjs/common';
import { ShopParserModule } from './shop-parser/shop-parser.module';

@Module({
  imports: [ShopParserModule],
})
export class AppModule { }
