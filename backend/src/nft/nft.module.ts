import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { NftService } from './nft.service';
import { NftController } from './nft.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: '../upload',
    }),
  ],
  providers: [NftService],
  controllers: [NftController],
})
export class NftModule { }
