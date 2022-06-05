import {
  AspectRatio,
  Badge,
  Button,
  Grid,
  Image,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HttpService from '../services/HttpService';

interface Metadata {
  name: string;
  description: string;
  author: string;
  class: string;
}

interface NFT {
  metadata: Metadata;
}
const NFTDetail = () => {
  const params = useParams();
  const [nft, setNft] = useState<NFT | null>(null);
  useEffect(() => {
    HttpService.get(`images/${params.id}`).then((res) => {
      setNft(res);
    });
  }, []);
  const matches = useMediaQuery('(max-width: 992px)');
  const theme = useMantineTheme();
  if (!nft) {
    return null;
  }
  return (
    <Grid gutter="xl">
      <Grid.Col xs={12} sm={6} md={5}>
        <AspectRatio ratio={1} mx="auto" style={{ borderRadius: '50px' }}>
          <Image
            radius="md"
            src={`${process.env.REACT_APP_API_ADDRESS}images/${params.id}/nft`}
            alt={nft?.metadata?.name}
          />
        </AspectRatio>
      </Grid.Col>
      <Grid.Col xs={12} sm={6} md={7}>
        <Text mb={theme.spacing.xs / 2}>{nft?.metadata?.author}</Text>
        <Title order={1} mb={theme.spacing.xs}>
          {nft?.metadata?.name}
        </Title>
        <Badge size="lg">{nft?.metadata?.class}</Badge>
        <Text mt={32} mb={32}>
          {nft?.metadata?.description}
        </Text>
        <Text size="sm" color="dimmed" weight={600}>
          Price
        </Text>
        <Title order={3} mb={16}>
          1.20 ETH
        </Title>
        <Button fullWidth={matches} radius="md" size="lg">
          Buy now
        </Button>
      </Grid.Col>
    </Grid>
  );
};

export default NFTDetail;
