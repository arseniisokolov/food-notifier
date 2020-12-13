import { Injectable } from '@nestjs/common';

@Injectable()
export class ShopParserService {
  getTodayPrice(): Product {
    const html = this.parseHtml('https://2021.vkusvill.ru/');
    const caption = html.split('id="tree-title">')[1].split('</')[0].trim();
    const price = parseFloat(
      html.split('news-prod-data-price-txt">')[1].split('<img')[0].trim(),
    );
    const imgSrc =
      'https://2021.vkusvill.ru/' +
      html
        .split('new-f-prod-img-blk')[1]
        .split('image:url(')[1]
        .split(')"')[0]
        .trim();
    return { caption, price, imgSrc };
  }

  private parseHtml(url: string): string {
    const shell = require('shelljs');
    return shell.exec(`curl ${url}`);
  }
}
