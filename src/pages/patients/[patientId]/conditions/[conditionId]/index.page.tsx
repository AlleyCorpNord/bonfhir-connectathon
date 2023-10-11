import { Paper, Title } from "@mantine/core";
import PatientLayout from "../../patient.layout";

export default function Condition() {
  return (
    <Paper>
      <Title order={3}>View Condition</Title>
    </Paper>
  );
}

Condition.layout = PatientLayout;
