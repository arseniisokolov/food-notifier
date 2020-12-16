import { Module, Global } from '@nestjs/common';
import { ShopParserController } from './shop-parser.controller';
import { ShopParserService } from './shop-parser.service';

@Global()
@Module({
  imports: [],
  controllers: [ShopParserController],
  providers: [ShopParserService],
  exports: [ShopParserService],
})
export class ShopParserModule {}
