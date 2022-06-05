import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { SharedModule } from 'src/shared/shared.module';
@Module({
  imports: [SharedModule],
  providers: [ContractService],
  controllers: [ContractController],
})
export class ContractModule { }
