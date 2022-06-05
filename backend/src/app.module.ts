import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContractModule } from './contract/contract.module';
import { NftModule } from './nft/nft.module';

@Module({
  imports: [ConfigModule.forRoot(), NftModule, ContractModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
