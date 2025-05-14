import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetPresenter } from './asset.presenter';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) { }

  @Post()

  async create(@Body() createAssetDto: CreateAssetDto) {

    const exists = await this.assetsService.exists(createAssetDto.name, createAssetDto.symbol);

    if (exists) {
      throw new HttpException(
        'Asset with the same name or symbol already exists, cannot create',
        HttpStatus.BAD_REQUEST,
      );
    }

    const asset = await this.assetsService.create(createAssetDto);

    return new AssetPresenter(asset);  
  }

  @Get()
  async findAll() {
    const assets = await this.assetsService.findAll();
    return assets.map((asset) => new AssetPresenter(asset));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const asset = await this.assetsService.findOne(id);
    return new AssetPresenter(asset!);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    const exists = await this.assetsService.existsExcludeId(id, updateAssetDto.name, updateAssetDto.symbol);

    if (exists) {
      throw new HttpException(
        'Asset with the same name or symbol already exists, cannot update',
        HttpStatus.BAD_REQUEST,
      );
    }


    return this.assetsService.update(id, updateAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(id);
  }
}
