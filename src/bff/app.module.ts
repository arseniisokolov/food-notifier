import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ShopParserModule } from './shop-parser/shop-parser.module';
import { AppMiddleware } from './app.middleware';

@Module({
  imports: [
    ShopParserModule,
    ScheduleModule.forRoot()
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
