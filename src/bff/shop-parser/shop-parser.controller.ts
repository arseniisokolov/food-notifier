import { Controller, Get } from '@nestjs/common';
import { ShopParserService } from './shop-parser.service';

const SALES_URL = 'https://2021.vkusvill.ru';

@Controller('/shop')
export class ShopParserController {
  constructor(private readonly shopParserService: ShopParserService) { }

  @Get('/today-sales-good')
  getTodaySalesGood(): Good {
    const goodUrl = this.shopParserService.parseSalesPage(SALES_URL);
    return this.shopParserService.parseGoodCardPage(goodUrl);
  }
}
