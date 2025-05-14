import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Asset } from './entities/asset.entity';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';

@Injectable()
export class AssetsService {

  constructor(@InjectModel(Asset.name) private assetSchema: Model<Asset>) { }

  create(createAssetDto: CreateAssetDto) {
    return this.assetSchema.create(createAssetDto);
  }

  findAll() {
    return this.assetSchema.find();
  }

  findOne(symbol: string) {
    return this.assetSchema.findOne({ symbol: { $regex: new RegExp(`^${symbol}$`, 'i') } });
  }

  update(id: string, updateAssetDto: UpdateAssetDto) {
    return this.assetSchema.findByIdAndUpdate(id, updateAssetDto, { new: true });
  }

  remove(id: string) {
    return this.assetSchema.findByIdAndDelete(id);
  }

  async exists(name: string, symbol: string) {
    return this.assetSchema.exists({
      $or: [{ name }, { symbol }],
    });
  }

  async existsExcludeId(id: string, name?: string, symbol?: string) {
    const query: any = { _id: { $ne: id } };

    if (name) query.name = name;
    if (symbol) query.symbol = symbol;

    return this.assetSchema.exists(query);
  }

  subscribeNewPriceChangedEvents(): Observable<Asset> {
    return new Observable((observer) => {
      this.assetSchema
        .watch(
          [
            {
              $match: {
                $or: [
                  { operationType: 'update' },
                  { operationType: 'replace' },
                ],
              },
            },
          ],
          {
            fullDocument: 'updateLookup',
            fullDocumentBeforeChange: 'whenAvailable',
          },
        )
        .on('change', async (data) => {
          if (data.fullDocument.price === data.fullDocumentBeforeChange.price) {
            return;
          }
          const asset = await this.assetSchema.findById(data.fullDocument._id);
          observer.next(asset!);
        });
    });
  }
}
