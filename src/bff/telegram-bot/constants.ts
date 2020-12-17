import * as TGB from 'node-telegram-bot-api';

export const SALES_KEYBOARD_CONFIG: TGB.InlineKeyboardButton[][] = [
    [
        {
            text: '🎁 Показать акцию "Товар дня (новогодняя)"',
            callback_data: 'getNewYearSale'
        }
    ],
    [
        {
            text: 'Обновить данные',
            callback_data: 'forceUpdate'
        }
    ]
];

export const GREETING_MESSAGE = 'Привет! 🥭 Сегодня я могу рассказать про акции Вкусвилла.\nДанные обновляются дважды в сутки.';

export const SALE_MESSAGE = ({ caption, url, salesPrice, price }: Partial<Good>, date: Date) => {
    const formattedDate = `${date.toLocaleDateString('ru-RU')}, ${date.toLocaleTimeString('ru-RU')}`;
    return `
<strong>${caption}</strong> 
<a href="${url}">Перейти на сайт ↗️</a>\n
Последнее обновление: ${formattedDate}
Цена по акции: ${salesPrice ? `<strong>${salesPrice} руб.</strong>` : 'не указана'}
Обычная цена: ${price} руб.
`;
}
