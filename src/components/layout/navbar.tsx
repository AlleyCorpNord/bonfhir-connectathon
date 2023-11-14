import { AppShell, NavLink, Stack, useMantineTheme } from "@mantine/core";
import {
  IconCalendar,
  IconClipboardData,
  IconCreditCard,
  IconHome,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { link: "/", label: "Home", icon: <IconHome /> },
  { link: "/calendar", label: "Calendar", icon: <IconCalendar /> },
  { link: "/patients", label: "Patients", icon: <IconUsers /> },
  { link: "/claims", label: "Claims", icon: <IconCreditCard /> },
  { link: "/reports", label: "Reports", icon: <IconClipboardData /> },
  { link: "/settings", label: "Settings", icon: <IconSettings /> },
];

export default function AppNavbar() {
  const router = useRouter();
  const theme = useMantineTheme();
  return (
    // <AppShell.Navbar h="100vh" w={{ sm: 160 }}>
    <AppShell.Section grow mt="xs">
      <Stack gap={0}>
        {links.map((link) => (
          <NavLink
            key={link.label}
            component={Link}
            href={link.link}
            leftSection={link.icon}
            label={link.label}
            active={
              link.link === "/"
                ? router.pathname === link.link
                : router.pathname.startsWith(link.link)
            }
          />
        ))}
      </Stack>
    </AppShell.Section>
    // </AppShell.Navbar>
  );
}
