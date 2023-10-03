import { Avatar, Button, Group, Header, Menu } from "@mantine/core";
import { IconChevronDown, IconLogin, IconLogout } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import logo from "./logo.svg";

export default function AppHeader() {
  return (
    <Header
      height={50}
      sx={(theme) => ({
        backgroundColor: theme.fn.primaryColor(),
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      })}
    >
      <Group position="apart" sx={{ height: "100%" }}>
        <Image src={logo} alt="logo" priority={true} />
        <UserMenu />
      </Group>
    </Header>
  );
}

function UserMenu() {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return (
      <Button
        onClick={() => signIn("medplum")}
        size="xs"
        leftIcon={<IconLogin size="1rem" />}
      >
        Login
      </Button>
    );
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button
          size="xs"
          leftIcon={
            <Avatar size="sm">
              {initials(session.user?.profile?.display)}
            </Avatar>
          }
          rightIcon={<IconChevronDown size="1rem" />}
        >
          {session.user?.profile?.display}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => signOut({ callbackUrl: "/" })}
          icon={<IconLogout size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function initials(name: string | undefined) {
  return name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}
