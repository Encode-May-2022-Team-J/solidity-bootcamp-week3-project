import {
  Button,
  createStyles,
  Divider,
  Group,
  Paper,
  Popover,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import React, { useState } from 'react';
import { useWallet } from '../services/blockchain';
import BlockchainService from '../services/BlockchainService';

const useStyles = createStyles((theme) => ({
  balanceCard: {
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.xs / 2,
    backgroundImage: `linear-gradient(-45deg, ${theme.colors.pink[6]} 0%, ${theme.colors.indigo[9]} 100%)`
  }
}));

const WalletButton = () => {
  const [opened, setOpened] = useState(false);
  const { walletAddress, etherBalance } = useWallet();
  const networkName = BlockchainService.networkName();
  const formattedWalletAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(
    walletAddress.length - 4
  )}`;
  const { classes } = useStyles();
  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position="bottom"
      placement="end"
      transition="pop-top-right"
      target={
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'pink' }}
          radius="xl"
          onClick={() => setOpened((o) => !o)}>
          My Wallet
        </Button>
      }>
      <Stack>
        <Group position="apart">
          <Text size="sm">Network</Text>

          <Text size="md" weight={700}>
            {networkName?.toUpperCase()}
          </Text>
        </Group>
        <Group position="apart">
          <Text size="sm">Account</Text>

          <Tooltip
            label={walletAddress}
            position="bottom"
            placement="end"
            openDelay={100}
            transition="fade"
            transitionDuration={200}
            transitionTimingFunction="ease">
            <Text size="md" weight={700}>
              {formattedWalletAddress}
            </Text>
          </Tooltip>
        </Group>
        <Divider />
        <Paper p="md" radius="lg" className={classes.balanceCard}>
          <Text size="sm" color="white">
            Total balance
          </Text>
          <Text size="xl" color="white" weight={700}>
            {etherBalance}
          </Text>
        </Paper>
      </Stack>
    </Popover>
  );
};

export default WalletButton;
