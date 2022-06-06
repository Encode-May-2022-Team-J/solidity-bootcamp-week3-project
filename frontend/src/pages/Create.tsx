import {
  Alert,
  Button,
  Group,
  LoadingOverlay,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from '../components/Dropzone';
import { useWallet } from '../services/blockchain';
import HttpService from '../services/HttpService';

const Create = () => {
  const [imageId, setImageId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { walletAddress } = useWallet();
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      class: '',
      author: 'Unknown'
    }
  });
  const handleDrop = (files: File[]) => {
    const formData = new FormData();
    console.log(files[0]);
    formData.append('file', files[0]);
    console.log(formData);
    HttpService.mutler('images', formData).then((res) => {
      console.log(res);
      setImageId(res);
    });
  };
  const handleSubmit = async (values: any) => {
    setError(null);
    if (imageId) {
      setLoading(true);
      await HttpService.post(`images/${imageId}/metadata`, values);
      let res;
      try {
        await HttpService.post(`images/${imageId}/metadata`, values);
        res = await HttpService.post(`contract/mint`, {
          address: walletAddress,
          nftId: imageId
        });
      } catch (error) {
        setLoading(false);
        setError('Fail to create your item. Please retry again!');
        return;
      }
      setLoading(false);
      if (res) {
        setError(null);
        navigate('/');
      }
    } else {
      setError('Please upload an image before you submit!');
    }
  };
  return (
    <>
      <LoadingOverlay visible={loading} />
      <Title mb={24}>Create New Item</Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {error && (
            <Alert title="Error" color="red" withCloseButton onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <Dropzone
            onDrop={handleDrop}
            imageSrc={imageId && `${process.env.REACT_APP_API_ADDRESS}images/${imageId}/nft`}
          />
          <TextInput
            placeholder="Item name"
            label="Name"
            required
            {...form.getInputProps('name')}
          />
          <Textarea
            placeholder="The description will be included on the item's detail page underneath its image."
            label="Description"
            required
            minRows={3}
            {...form.getInputProps('description')}
          />

          <Select
            label="Class"
            placeholder="Select class"
            required
            {...form.getInputProps('class')}
            data={[
              { value: 'Legendary', label: 'Legendary' },
              { value: 'Common', label: 'Common' },
              { value: 'Confidential', label: 'Confidential' },
              { value: 'Warrior', label: 'Warrior' },
              { value: 'Rare', label: 'Rare' }
            ]}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};

export default Create;
