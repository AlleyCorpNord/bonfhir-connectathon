import { Patient } from "@bonfhir/core/r4b";
import { FhirValue } from "@bonfhir/react/r4b";
import { Paper, Title } from "@mantine/core";

export interface PatientInfoProps {
  patient: Patient;
}

export default function PatientInfo({ patient }: PatientInfoProps) {
  return (
    <Paper>
      <Title order={3}>
        <FhirValue type="HumanName" value={patient.name} />
      </Title>
    </Paper>
  );
}
