import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ShopParserModule } from './shop-parser/shop-parser.module';
import { AppMiddleware } from './app.middleware';

@Module({
  imports: [ShopParserModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
