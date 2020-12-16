import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TGB from 'node-telegram-bot-api';
import { ShopParserService } from '../shop-parser/shop-parser.service';
import { SALE_MESSAGE, GREETING_MESSAGE, SALES_KEYBOARD_CONFIG } from './constants';

@Injectable()
export class TelegramBotService implements OnModuleInit {
    private bot: TGB;
    private chatId: number;

    constructor(private shopParserService: ShopParserService) {
        this.bot = new TGB(process.env.TELEGRAM_BOT_TOKEN, { polling: true, filepath: false, });
    }

    onModuleInit() {
        this.initialize();
    }

    private initialize() {
        this.bot.on('message', (msg) => {
            this.chatId = msg.chat.id;
            this.sendGreeting();
        });
        this.handleKeyboardInput();
    }

    private handleKeyboardInput() {
        this.bot.on('callback_query', (query) => {
            switch (query.data) {
                case 'getNewYearSale':
                    this.sendSale();
                    break;
                case 'forceUpdate':
                    this.sendSale();
                    break;
            }
        });
    }

    private sendSale() {
        const share = this.shopParserService.getShare();
        const { imgSrc, ...good } = share.goods[0];
        this.bot.sendPhoto(this.chatId, imgSrc, {
            caption: SALE_MESSAGE(good, new Date(share.dates[0])),
            parse_mode: 'HTML'
        });
    }

    private sendGreeting() {
        this.bot.sendMessage(this.chatId, GREETING_MESSAGE, {
            reply_markup: {
                inline_keyboard: SALES_KEYBOARD_CONFIG
            },
        });
    }
}
