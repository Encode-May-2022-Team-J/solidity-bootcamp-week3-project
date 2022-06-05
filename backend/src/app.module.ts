import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftModule } from './nft/nft.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [NftModule, ContractModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
