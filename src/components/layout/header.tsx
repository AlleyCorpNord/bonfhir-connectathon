import { Group, Header } from "@mantine/core";
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
        <Image src={logo} alt="logo" />
      </Group>
    </Header>
  );
}
