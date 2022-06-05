import { Injectable, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { create } from 'ipfs-http-client';
import { IPFSHTTPClient } from 'ipfs-http-client/types/src/types';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';
import { FileDataDto } from 'src/dtos/file-data.dto';
import { Nft } from 'src/schemas/nft.interface';
import { MetadataDto } from 'src/dtos/metadata.dto';

const DB_PATH = '../db/db.json';

@Injectable()
export class NftService {
  db: JsonDB;
  lastId: number;
  ipfsClient: IPFSHTTPClient;

  constructor() {
    this.db = new JsonDB(new Config(DB_PATH, true, true, '/'));
    this.ipfsClient = create({
      host: 'localhost',
      port: 5001,
      protocol: 'http',
    });

    const data = this.db.getData('/');
    this.lastId =
      data && Object.keys(data).length > 0
        ? Math.max(...Object.keys(data).map((key) => Number(key)))
        : -1;
  }

  getAll(): [] {
    return this.db.getData('/');
  }

  getById(id: number): Nft {
    try {
      return this.db.getData(`/${id}`) as Nft;
    } catch (_) {
      return null;
    }
  }

  async getNFTById(id: number) {
    const data = await this.getById(id);
    if (!data) {
      return null;
    }
    if (!data.ipfs) {
      return null;
    }
    const ipfsData = await this.ipfsClient.cat(data.ipfs.path);

    const content = [];
    for await (const chunk of ipfsData) {
      content.push(chunk);
    }
    const fileStream = uint8ArrayConcat(content);
    return new StreamableFile(fileStream);
  }

  async setMetadata(id: number, metadata: MetadataDto) {
    let file: any;
    try {
      file = this.getById(id)?.file;
    } catch (error) {
      return { error };
    }
    if (!file) return false;
    this.db.push(`/${id}/metadata`, metadata);
    return this.getById(id);
  }

  async getMetadataById(id: number): Promise<MetadataDto> {
    return this.getById(id)?.metadata as MetadataDto;
  }

  async saveToIfps(file: FileDataDto) {
    const obj = new Nft(file);
    const fileId = ++this.lastId;
    this.db.push(`/${fileId}`, obj);
    const fileLocation = `../upload/${obj.file.storageName}`;
    const fileBytes = fs.readFileSync(fileLocation);
    const ipfsData = await this.ipfsClient.add(fileBytes);
    this.db.push(`/${fileId}/ipfs`, ipfsData);
    return fileId;
  }

  isIpfsNodeOnline(): boolean {
    try {
      return this.ipfsClient.isOnline();
    } catch (e) {
      return false;
    }
  }
}
