import {
  Badge,
  Card,
  createStyles,
  Group,
  Image,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.02)'
    }
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: 'none'
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.xs / 2,
    marginBottom: theme.spacing.xs
  },

  price: {
    minWidth: 70
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0]
  },

  metadata: {
    marginTop: theme.spacing.md
  }
}));

interface ImageCardProps {
  image: string;
  link: string;
  title?: string;
  price?: string;
  author?: string;
  nftClass?: string;
}

export function ImageCard({
  className,
  image,
  link,
  title,
  author,
  price,
  nftClass,
  ...others
}: ImageCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ImageCardProps>) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Card
      withBorder
      radius="md"
      className={cx(classes.card, className)}
      {...others}
      onClick={() => navigate(link)}>
      <Card.Section>
        <a>
          <Image src={image} height={250} />
        </a>
      </Card.Section>

      {nftClass && (
        <Badge
          className={classes.rating}
          variant="gradient"
          gradient={{ from: 'purple', to: 'red' }}>
          {nftClass}
        </Badge>
      )}
      <Group spacing="sm" position="apart" align="flex-start" className={classes.metadata} noWrap>
        <Stack spacing={theme.spacing.xs / 2}>
          {author && (
            <Text size="sm" inline color="gray">
              {author}
            </Text>
          )}
          {title && <Text weight={500}>{title}</Text>}
        </Stack>
        {price && (
          <Stack spacing={theme.spacing.xs / 2} align="flex-end" className={classes.price}>
            <Text size="xs" inline color="gray">
              Price
            </Text>
            <Text size="sm" weight={700}>
              {price}
            </Text>
          </Stack>
        )}
      </Group>
    </Card>
  );
}
