import { share } from 'rxjs';
import { AssetPresenter } from '../assets/asset.presenter';
import { Asset } from '../assets/entities/asset.entity';
import { Order } from './entities/order.entity';
import { type } from 'os';
//import { WalletAsset } from './entities/wallet-asset.entity';
//import { Wallet } from './entities/wallet.entity';

export class OrdersPresenter {
  constructor(
    private order: Order & { asset: Asset },
  ) { }

  toJSON() {
   return {
      _id: this.order._id,
      asset: new AssetPresenter(this.order.asset).toJSON(),
      shares: this.order.shares,
      partial: this.order.partial,
      price: this.order.price,
      type: this.order.type,
      status: this.order.status, 
    } 
  }

}

