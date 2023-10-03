import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirQueryLoader, useFhirUIContext } from "@bonfhir/react/r4b";
import { Stack, Tabs } from "@mantine/core";
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
import Appointments from "./appointments";
import Conditions from "./conditions";
import Medications from "./medications";
import Notes from "./notes";
import Overview from "./overview";
import PatientInfo from "./patient-info";
import Vitals from "./vitals";

const tabs = [
  {
    value: "overview",
    title: "Overview",
    icon: IconUser,
    component: Overview,
  },
  {
    value: "appointments",
    title: "Appointments",
    icon: IconCalendar,
    component: Appointments,
  },
  {
    value: "conditions",
    title: "Conditions",
    icon: IconStethoscope,
    component: Conditions,
  },
  {
    value: "medications",
    title: "Medications",
    icon: IconPill,
    component: Medications,
  },
  {
    value: "vitals",
    title: "Vitals",
    icon: IconActivity,
    component: Vitals,
  },
  {
    value: "notes",
    title: "Notes",
    icon: IconClipboardText,
    component: Notes,
  },
] as const;

export default function PatientTab() {
  const router = useRouter();
  const { formatter } = useFhirUIContext();
  const { patientId, patientTab } = router.query as Record<string, string>;

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
              value={patientTab || "overview"}
              onTabChange={(value) =>
                router.push(`/patients/${patientId}/${value}`)
              }
              keepMounted={false}
            >
              <Tabs.List>
                {tabs.map((tab) => (
                  <Tabs.Tab
                    key={tab.value}
                    icon={<tab.icon size="0.8rem" />}
                    value={tab.value}
                  >
                    {tab.title}
                  </Tabs.Tab>
                ))}
              </Tabs.List>

              {tabs.map((tab) => (
                <Tabs.Panel key={tab.value} value={tab.value} py="xl">
                  <tab.component patient={patient} />
                </Tabs.Panel>
              ))}
            </Tabs>
          </Stack>
        </>
      )}
    </FhirQueryLoader>
  );
}
