import { Grid, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { ImageCard } from '../components/ImageCard';
import HttpService from '../services/HttpService';

const Explore = () => {
  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    HttpService.get('images').then((res) => {
      setNfts(res);
    });
  }, []);
  return (
    <>
      <Title mb={24}>Explore</Title>
      <Grid>
        {nfts &&
          Object.keys(nfts).map((key: any) => {
            const { metadata } = nfts[key];
            return (
              <Grid.Col span={4} key={key}>
                <ImageCard
                  image={`${process.env.REACT_APP_API_ADDRESS}images/${key}/nft`}
                  title={metadata['name']}
                  author={metadata['author']}
                  link={`/assets/${key}`}
                  price="1.20 ETH"
                  nftClass={metadata['class']}
                />
              </Grid.Col>
            );
          })}
        {/* {nfts.map((nft) => (
          <Grid.Col span={4} key={nft.id}>
            <ImageCard
              image={nft.image}
              title={nft.title}
              author={nft.author}
              link={`/assets/${nft.id}`}
              price="1.20 ETH"
              nftClass={nft.class}
            />
          </Grid.Col>
        ))} */}
      </Grid>
    </>
  );
};

export default Explore;
