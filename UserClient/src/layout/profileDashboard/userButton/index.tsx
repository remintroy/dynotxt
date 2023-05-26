import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  ActionIcon,
  Loader,
  Skeleton,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useAppSelector } from "../../../lib/redux/hooks";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function UserButton({ image, name, email, icon, ...others }: UserButtonProps) {
  const { classes } = useStyles();
  const userLoading = useAppSelector((state) => state.user.loading);

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group sx={{ display: "flex", alignItems: "center" }}>
        {userLoading ? <Skeleton height={50} circle /> : <Avatar src={image} radius="xl" />}

        <div style={{ flex: 1 }}>
          {userLoading ? (
            <Skeleton height={20} />
          ) : (
            <Text size="sm" weight={500}>
              {name}
            </Text>
          )}
          {userLoading ? (
            <Skeleton height={10} mt={10} />
          ) : (
            <Text color="dimmed" size="xs">
              {email}
            </Text>
          )}
        </div>

        {!userLoading && (icon || <IconChevronRight size="0.9rem" stroke={1.5} />)}
      </Group>
    </UnstyledButton>
  );
}
