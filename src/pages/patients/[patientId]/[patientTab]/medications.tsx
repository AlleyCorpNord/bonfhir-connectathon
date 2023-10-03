import { FhirValue } from "@bonfhir/react/r4b";
import { Paper, Title } from "@mantine/core";
import { TabProps } from "./tab-props";

export default function Medications({ patient }: TabProps) {
  return (
    <Paper>
      <Title order={3}>
        Medications for <FhirValue type="HumanName" value={patient.name} />
      </Title>
    </Paper>
  );
}
