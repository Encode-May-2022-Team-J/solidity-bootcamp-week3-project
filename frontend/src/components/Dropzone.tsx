import {
  Group,
  Image,
  LoadingOverlay,
  MantineTheme,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core';
// import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import { Dropzone as MantineDropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export const dropzoneChildren = (imageSrc?: string | null) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    {/* <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} /> */}

    {imageSrc ? (
      <Image
        height={200}
        // src={`${process.env.REACT_APP_API_ADDRESS}images/${params.id}/nft`}
        src={imageSrc}
      />
    ) : (
      <Stack align="center" spacing="xs">
        <Text size="xl" inline>
          Drag images here or click to select files
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size:
          100 MB
        </Text>
      </Stack>
    )}
  </Group>
);
interface DropzoneProps {
  onDrop: (files: File[]) => void;
  imageSrc?: string | null;
}

const Dropzone = ({ onDrop, imageSrc }: DropzoneProps) => {
  return (
    <Stack>
      <Text size="sm" weight={500}>
        Image
      </Text>
      <MantineDropzone
        onDrop={onDrop}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}>
        {() => dropzoneChildren(imageSrc)}
      </MantineDropzone>
    </Stack>
  );
};

export default Dropzone;
