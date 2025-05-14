import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AssetsService } from './assets/assets.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  const assetService = app.get(AssetsService);
  // assetService.subscribeNewPriceChangedEvents().subscribe((event) => {
    // console.log(event);
    
  // })
}
bootstrap();
