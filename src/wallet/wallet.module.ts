import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from './entities/wallet.entity';
import { WalletAsset, WalletAssetSchema } from './entities/wallet-asset.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
      {
        name: WalletAsset.name,
        schema:WalletAssetSchema,
      }
    ])
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule { }
