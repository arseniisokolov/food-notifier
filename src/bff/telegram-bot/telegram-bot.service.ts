import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramBotService implements OnModuleInit {
    private bot: TelegramBot;

    constructor() {
        this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
    }

    onModuleInit() {
        this.bot.on('message', (msg) => {
            console.log(msg);
            const chatId = msg.chat.id;
            this.bot.sendMessage(chatId, 'Привет, Друг!');
        });
    }
}
