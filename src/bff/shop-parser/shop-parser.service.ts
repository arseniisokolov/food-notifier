import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as shelljs from 'shelljs';

@Injectable()
export class ShopParserService implements OnModuleInit {
  private good: Good | null = null;
  private modificationDate: number;

  onModuleInit() {
    this.updateGood();
  }

  @Cron('0 0 2,14 1/1 * *')
  updateGood() {
    const goodUrl = this.parseSalesPage(process.env.SALE_LANDING_URL);
    this.good = this.parseGoodCardPage(goodUrl);
    this.modificationDate = Date.now();
  }

  getGood() {
    return this.good;
  }

  getModificationDate() {
    return this.modificationDate;
  }

  getShare(): Share {
    return {
      goods: [this.getGood()],
      dates: [this.getModificationDate(), null]
    }
  }

  private parseGoodCardPage(url: Good['url']): Good {
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

  private parseSalesPage(url: string): Good['url'] {
    const saleHtml = this.parseHtml(url);
    return saleHtml.split('news-prod-data')[1].split('<a href="')[1].split('"')[0].trim();
  }

  private parseHtml(url: string): string {
    return shelljs.exec(`curl ${url}`);
  }
}
