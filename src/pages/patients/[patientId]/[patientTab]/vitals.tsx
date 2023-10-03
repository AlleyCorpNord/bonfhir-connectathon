import { FhirValue } from "@bonfhir/react/r4b";
import { Paper, Title } from "@mantine/core";
import { TabProps } from "./tab-props";

export default function Vitals({ patient }: TabProps) {
  return (
    <Paper>
      <Title order={3}>
        Vitals for <FhirValue type="HumanName" value={patient.name} />
      </Title>
    </Paper>
  );
}
