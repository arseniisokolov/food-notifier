import { Module } from '@nestjs/common';
import { ShopParserController } from './shop-parser.controller';
import { ShopParserService } from './shop-parser.service';

@Module({
    imports: [],
    controllers: [ShopParserController],
    providers: [ShopParserService],
})
export class ShopParserModule { }
