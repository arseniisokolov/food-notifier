import { Controller, Get, Post } from '@nestjs/common';
import { ShopParserService } from './shop-parser.service';


@Controller('/shop')
export class ShopParserController {
  constructor(private readonly shopParserService: ShopParserService) { }

  @Get('/today-share')
  getTodayShare(): Share {
    return {
      goods: [this.shopParserService.getGood()],
      dates: [this.shopParserService.getModificationDate(), null]
    };
  }

  @Post('/today-share')
  updateData() {
    try {
      this.shopParserService.updateGood();
      return 'OK';
    } catch (err) {
      return err;
    }
  }
}
