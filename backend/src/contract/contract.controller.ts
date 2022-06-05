import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { MintRequestDto } from './dtos/mint-request.dto';

@Controller('contract')
@ApiTags('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) { }

  @Get('nft/:id')
  @ApiResponse({
    status: 200,
    description: 'Returns the URI of the NFT',
    type: String,
  })
  async getNft(@Param('id') id: number): Promise<string> {
    try {
      return await this.contractService.getNftUri(id);
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }

  @Post('mint')
  @ApiResponse({
    status: 200,
    description: 'Mint NFT',
    type: Number,
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not connected to a valid provider',
    type: HttpException,
  })
  async mintNft(@Body() data: MintRequestDto) {
    try {
      const result = await this.contractService.mintNFT(
        data.address,
        data.nftId,
      );
      return Number(result);
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }
}
