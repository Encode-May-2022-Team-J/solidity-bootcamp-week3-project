import { Grid, Title } from '@mantine/core';
import React from 'react';
import { ImageCard } from '../components/ImageCard';

const image = {
  image:
    'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  title: 'Journey to Swiss Alps ',
  description:
    'Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.',
  author: 'Bill Wormeater',
  price: '1.20 ETH',
  class: 'Rare'
};

const images = [...Array(10)].map((_, i) => ({ id: i, ...image }));
const Explore = () => {
  return (
    <>
      <Title mb={24}>Explore</Title>
      <Grid>
        {images.map((image) => (
          <Grid.Col span={4} key={image.id}>
            <ImageCard
              image={image.image}
              title={image.title}
              author={image.author}
              link={`/assets/${image.id}`}
              price={image.price}
              nftClass={image.class}
            />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default Explore;
