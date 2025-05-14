import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetsModule } from './assets/assets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModule } from './wallet/wallet.module';
import { OrdersModule } from './orders/orders.module';
//import { AssetDailyModule } from './asset-daily/asset-daily.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://admin:password@127.0.0.1:27017/nest?authSource=admin&directConnection=true'), AssetsModule, WalletModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
