import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { types } from "util";
import * as crypto from 'crypto';
import { WalletAsset, WalletAssetDocument } from "./wallet-asset.entity";

export type WalletDocument = HydratedDocument<Wallet>; //Me permite criar documentos em JS para enviar para o MONGO

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({type:[mongoose.Schema.Types.String], set: (v)=> [...new Set(v)], ref: WalletAsset.name})
  //Aqui é tipo um oneToMany
  assets: WalletAssetDocument[] | string[]
  createdAt!: Date; //Variaveis controladas pelo mongoose e nao sera gerado pelo typescript
  updateAt!: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
