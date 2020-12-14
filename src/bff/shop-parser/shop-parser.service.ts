import { Injectable } from '@nestjs/common';

@Injectable()
export class ShopParserService {

  parseGoodCardPage(url: Good['url']): Good {
    const goodCardHtml = this.parseHtml(url);
    const caption = goodCardHtml.split('<h1')[1].split('>')[1].split('</')[0].trim();
    const price = parseFloat(
      goodCardHtml.split('Price--lg')[1].split('class="Price__value"')[1].split('>')[1].split('</')[0].trim(),
    );
    const salesPrice = parseFloat(
      goodCardHtml.split('Price--gold')[1].split('class="Price__value"')[1].split('>')[1].split('</')[0].trim(),
    );
    const imgSrc = goodCardHtml.split('ProductGallery__image')[1].split('<img')[1].split('data-src="')[1].split('"')[0].trim();
    return { caption, price, salesPrice, imgSrc, url };
  }

  parseSalesPage(url: string): Good['url'] {
    const saleHtml = this.parseHtml(url);
    return saleHtml.split('news-prod-data')[1].split('<a href="')[1].split('"')[0].trim();
  }

  private parseHtml(url: string): string {
    const shell = require('shelljs');
    return shell.exec(`curl ${url}`);
  }
}
