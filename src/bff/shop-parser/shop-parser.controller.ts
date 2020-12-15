import { Controller, Get, Post } from '@nestjs/common';
import { ShopParserService } from './shop-parser.service';


@Controller('/shop')
export class ShopParserController {
  constructor(private readonly shopParserService: ShopParserService) { }

  @Get('/today-share')
  getTodayShare(): Share {
    return this.shopParserService.getShare();
  }

  @Post('/today-share')
  updateData() {
    this.shopParserService.updateGood();
    return this.shopParserService.getShare();
  }
}
