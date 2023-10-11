import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirQueryLoader, useFhirUIContext } from "@bonfhir/react/r4b";
import { Space, Stack, Tabs } from "@mantine/core";
import {
  IconActivity,
  IconCalendar,
  IconClipboardText,
  IconPill,
  IconStethoscope,
  IconUser,
} from "@tabler/icons-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import PatientInfo from "./patient-info";

export default function PatientLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const { formatter } = useFhirUIContext();
  const { patientId } = router.query as Record<string, string>;
  const activeTab = router.pathname.split("/")?.[3] || "overview";

  const patientQuery = useFhirRead("Patient", patientId, {
    query: {
      enabled: Boolean(patientId),
    },
  });

  return (
    <FhirQueryLoader query={patientQuery}>
      {(patient) => (
        <>
          <Head>
            <title>
              {formatter.format("HumanName", patient.name, { max: 1 })}
            </title>
          </Head>
          <Stack>
            <PatientInfo patient={patient} />
            <Tabs
              value={activeTab}
              onTabChange={(tab) =>
                router.push(
                  tab === "overview"
                    ? `/patients/${patientId}`
                    : `/patients/${patientId}/${tab}`,
                )
              }
            >
              <Tabs.List>
                <Tabs.Tab icon={<IconUser size="0.8rem" />} value="overview">
                  Overview
                </Tabs.Tab>
                <Tabs.Tab
                  icon={<IconCalendar size="0.8rem" />}
                  value="appointments"
                >
                  Appointments
                </Tabs.Tab>
                <Tabs.Tab
                  icon={<IconStethoscope size="0.8rem" />}
                  value="conditions"
                >
                  Conditions
                </Tabs.Tab>
                <Tabs.Tab icon={<IconPill size="0.8rem" />} value="medications">
                  Medications
                </Tabs.Tab>
                <Tabs.Tab icon={<IconActivity size="0.8rem" />} value="vitals">
                  Vitals
                </Tabs.Tab>
                <Tabs.Tab
                  icon={<IconClipboardText size="0.8rem" />}
                  value="encounters"
                >
                  Encounters
                </Tabs.Tab>
              </Tabs.List>
              <Space h="md" />
              {children}
            </Tabs>
          </Stack>
        </>
      )}
    </FhirQueryLoader>
  );
}
