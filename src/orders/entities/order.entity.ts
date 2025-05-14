import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { types } from "util";
import * as crypto from 'crypto';
import { Asset, AssetDocument } from "src/assets/entities/asset.entity";
import { Wallet, WalletDocument } from "src/wallet/entities/wallet.entity";


export type OrderDocument = HydratedDocument<Order>; //Me permite criar documentos em JS para enviar para o MONGO

export enum OrderType{
  BUY= 'BUY',
  SELL= 'SELL'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FAILED = 'FAILED'
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  partial: number;

  @Prop({ type: String, ref: Wallet.name })
  wallet: WalletDocument | string;

  @Prop({ type: String, ref: Asset.name })
  asset: AssetDocument | string;

  @Prop()
  price: number;
  
  @Prop()
  type: OrderType;

  @Prop()
  status: OrderStatus;


  

  createdAt!: Date; //Variaveis controladas pelo mongoose e nao sera gerado pelo typescript
  updateAt!: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

