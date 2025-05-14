import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { types } from "util";
import * as crypto from 'crypto';

export type AssetDocument = HydratedDocument<Asset>; //Me permite criar documentos em JS para enviar para o MONGO

@Schema({
  timestamps: true, collectionOptions: {
    changeStreamPreAndPostImages: {
      enabled: true,
    }
  }
})
export class Asset {


  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  image: string;

  @Prop(types)
  price: number;


  createdAt!: Date; //Variaveis controladas pelo mongoose e nao sera gerado pelo typescript
  updateAt!: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
