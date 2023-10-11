import { FhirValue } from "@bonfhir/react/r4b";
import { Paper, Title } from "@mantine/core";
import { usePatientContext } from "./patient.context";
import PatientLayout from "./patient.layout";

export default function Overview() {
  const { patient } = usePatientContext();

  return (
    <Paper>
      <Title order={3}>
        Overview for <FhirValue type="HumanName" value={patient.name} />
      </Title>
    </Paper>
  );
}

Overview.layout = PatientLayout;
