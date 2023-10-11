import { Patient } from "@bonfhir/core/r4b";
import { FhirValue } from "@bonfhir/react/r4b";
import { Button, Paper, Stack, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

export interface PatientInfoProps {
  patient: Patient;
}

export default function PatientInfo({ patient }: PatientInfoProps) {
  const router = useRouter();

  return (
    <Stack spacing="sm">
      <Stack align="flex-start" spacing="xs">
        <Button
          variant="subtle"
          compact
          leftIcon={<IconArrowLeft />}
          onClick={() => router.push("/patients")}
        >
          Back to Patient List
        </Button>
      </Stack>
      <Paper>
        <Title order={3}>
          <FhirValue type="HumanName" value={patient.name} />
        </Title>
      </Paper>
    </Stack>
  );
}
