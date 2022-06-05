import {
  Anchor,
  Burger,
  Container,
  createStyles,
  Group,
  Header as MantineHeader,
  Paper,
  Title,
  Transition,
  useMantineTheme,
  Text
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import WalletButton from './WalletButton';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  logo: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
  root: {
    position: 'relative',
    zIndex: 1
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md
    }
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7]
    }
  }
}));

interface HeaderProps {
  links: { link: string; label: string }[];
}

export function Header({ links }: HeaderProps) {
  const theme = useMantineTheme();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={classes.link}
      style={({ isActive }) =>
        isActive
          ? {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                  : theme.colors[theme.primaryColor][0],
              color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7]
            }
          : {}
      }>
      {link.label}
    </NavLink>
  ));

  return (
    <MantineHeader height={HEADER_HEIGHT} mb={16} className={classes.root}>
      <Container className={classes.header}>
        <Anchor component={Link} to="/" className={classes.logo}>
          <Title>NFT</Title>
        </Anchor>
        <Group spacing={8}>
          <Group spacing={8} className={classes.links}>
            {items}
          </Group>

          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />

          <Transition transition="pop-top-right" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
          <WalletButton />
        </Group>
      </Container>
    </MantineHeader>
  );
}
