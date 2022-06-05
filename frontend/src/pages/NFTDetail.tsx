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
import React from 'react';

const image = {
  image:
    'https://lh3.googleusercontent.com/GagPYFAxo_oKxr_3PfDComcpAbEb5CNPnA9FE2R8jmg2dSOUPWz0d3zUHsoIax9ElrRVi4B-MqoCTcQ1xOV5EFl9x_oZRxbvLxYq7A=s0',
  title: 'Journey to Swiss Alps ',
  description:
    'Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.',
  author: 'Bill Wormeater',
  price: '1.20 ETH',
  class: 'Rare'
};

const NFTDetail = () => {
  const matches = useMediaQuery('(max-width: 992px)');
  const theme = useMantineTheme();
  return (
    <Grid gutter="xl">
      <Grid.Col xs={12} sm={6} md={5}>
        <AspectRatio ratio={1} mx="auto" style={{ borderRadius: '50px' }}>
          <Image radius="md" src={image.image} alt={image.title} />
        </AspectRatio>
      </Grid.Col>
      <Grid.Col xs={12} sm={6} md={7}>
        <Text mb={theme.spacing.xs / 2}>{image.author}</Text>
        <Title order={1} mb={theme.spacing.xs}>
          {image.title}
        </Title>
        <Badge size="lg">{image.class}</Badge>
        <Text mt={32} mb={32}>
          {image.description}
        </Text>
        <Text size="sm" color="dimmed" weight={600}>
          Price
        </Text>
        <Title order={3} mb={16}>
          {image.price}
        </Title>
        <Button fullWidth={matches} radius="md" size="lg">
          Buy now
        </Button>
      </Grid.Col>
    </Grid>
  );
};

export default NFTDetail;
