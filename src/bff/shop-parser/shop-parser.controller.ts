import { Controller, Get, Post } from '@nestjs/common';
import { ShopParserService } from './shop-parser.service';


@Controller('/shop')
export class ShopParserController {
  constructor(private readonly shopParserService: ShopParserService) { }

  @Get('/today-sale')
  getTodaySale(): Sale {
    return this.shopParserService.getSale();
  }

  @Post('/today-sale')
  updateData() {
    this.shopParserService.updateGood();
    return this.shopParserService.getSale();
  }
}
