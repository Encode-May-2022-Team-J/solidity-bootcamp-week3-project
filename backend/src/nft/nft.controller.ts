import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Response,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Express } from 'express';
import { FileDataDto } from 'src/dtos/file-data.dto';
import { MetadataDto } from 'src/dtos/metadata.dto';
import { NftService } from './nft.service';

@ApiTags('nft')
@Controller('')
export class NftController {
  constructor(private readonly nftService: NftService) { }

  @Get('images')
  getAllData() {
    return this.nftService.getAll();
  }

  @Get('images/:id')
  @ApiOperation({
    summary: 'Get image by id',
    description: 'Gets the image at the requested index',
  })
  @ApiResponse({
    status: 200,
    description: 'Element',
  })
  getById(@Param('id') id: number) {
    const data = this.nftService.getById(id);
    if (data) {
      return data;
    }
    throw new NotFoundException();
  }

  @Get('images/:id/nft')
  @ApiOperation({
    summary: 'Get element by id',
    description: 'Gets the element at the requested index',
  })
  @ApiResponse({
    status: 200,
    description: 'Element',
  })
  async getNft(@Response({ passthrough: true }) res, @Param('id') id: number) {
    const nft = await this.nftService.getNFTById(id);
    if (nft) {
      res.set({
        'Content-Type': 'image/jpeg',
      });
      return nft;
    }
    throw new NotFoundException();
  }

  @Get('images/:id/metadata')
  @ApiOperation({
    summary: 'Get metadata by id',
    description: 'Gets the metadata of NFT',
  })
  @ApiResponse({
    status: 200,
    description: 'Element',
  })
  async getMetadata(@Param('id') id: number) {
    const metadata = await this.nftService.getMetadataById(id);
    if (metadata) {
      return metadata;
    }
    throw new NotFoundException();
  }

  @Post('images/:id/metadata')
  @ApiOperation({
    summary: 'Set metadata by id',
    description: 'Set the NFT metadata',
  })
  @ApiResponse({
    status: 200,
    description: 'Element',
  })
  async setMetadata(@Param('id') id: number, @Body() body: MetadataDto) {
    return await this.nftService.setMetadata(id, body);
  }

  @Post('images')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileData = new FileDataDto(
      file.originalname,
      file.mimetype,
      file.filename,
      file.size,
    );
    return this.nftService.saveToIfps(fileData);
  }

  @Get('ipfs-status')
  @ApiOperation({
    summary: 'IPFS node connection',
    description: 'Returns true if the IPFS Node configured is running',
  })
  @ApiResponse({
    status: 200,
    description: 'IPFS Node connection',
    type: Boolean,
  })
  getIpfsStatus(): boolean {
    return this.nftService.isIpfsNodeOnline();
  }
}
