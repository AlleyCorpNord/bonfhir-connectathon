"use client";
import {
  ConditionSortOrder,
  asBundlePagination,
  compareBy,
} from "@bonfhir/core/r4b";
import { useFhirSearchControllerNext } from "@bonfhir/next/r4b/client";
import { useFhirSearch } from "@bonfhir/query/r4b";
import {
  FhirPagination,
  FhirQueryLoader,
  FhirTable,
  FhirValue,
} from "@bonfhir/react/r4b";
import { Box, Button, Flex, Paper, Stack, Title } from "@mantine/core";
import { IconChevronRight, IconPlus } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";

export default function Conditions() {
  // The search controller coordinates the pagination
  // between the query, the table and the pagination
  const params = useParams();
  const router = useRouter();
  const searchController = useFhirSearchControllerNext<ConditionSortOrder>(
    "q",
    {
      pageSize: 10,
      defaultSort: "clinical-status",
    },
  );

  // For pagination to work the total must be requested and
  // the `searchController.pageUrl` must be passed to the search as well
  const conditionsQuery = useFhirSearch(
    "Condition",
    (search) => search.patient(params.patientId)._sort(searchController.sort),
    searchController.pageUrl,
  );
  const paginatedConditions = asBundlePagination({
    data: conditionsQuery.data
      ?.searchMatch()
      ?.map((condition: any) => ({
        ...condition,
        id: condition?.id,
        condition: condition?.code?.coding?.[0]?.display,
      }))
      .sort(compareBy(searchController.sort)),
    pageSize: searchController.pageSize,
    pageUrl: searchController.pageUrl,
  });

  const onAddButtonClick = () => {
    //TODO
  };

  return (
    <Paper>
      <Stack>
        <Title order={3}>Conditions</Title>
        <Flex justify={"right"}>
          <Box>
            <Button onClick={onAddButtonClick}>
              <IconPlus />
              Add Condition
            </Button>
          </Box>
        </Flex>
        <Box>
          <FhirQueryLoader query={conditionsQuery}>
            <FhirTable
              data={paginatedConditions.data || []}
              {...searchController}
              // onRowNavigate={(condition) => console.log(params)}
              onRowNavigate={(condition) =>
                `/patients/${params.patientId}/conditions/${condition.id}`
              }
              columns={[
                {
                  key: "condition",
                  title: "Condition",
                  sortable: false,
                  render: (condition) => (
                    <FhirValue
                      type="string"
                      value={condition.code?.coding?.[0]?.display}
                    />
                  ),
                },
                {
                  key: "clinical-status",
                  title: "Condition Status",
                  sortable: true,
                  render: (condition) => (
                    <FhirValue
                      type="string"
                      value={condition.clinicalStatus?.coding?.[0]?.code}
                    />
                  ),
                },
                {
                  key: "onset-date",
                  title: "Onset Date",
                  sortable: true,
                  render: (condition) => (
                    <FhirValue
                      type="dateTime"
                      value={condition.onsetDateTime}
                    />
                  ),
                },
                {
                  key: "recorded-by",
                  title: "Recorded By",
                  sortable: false,
                  render: (condition) => (
                    <FhirValue
                      type="string"
                      value={condition.recorder?.display}
                    />
                  ),
                },
                {
                  key: "recorded-date",
                  title: "Recorded At",
                  sortable: false,
                  render: (condition) => (
                    <FhirValue type="dateTime" value={condition.recordedDate} />
                  ),
                },
                {
                  key: "arrow-icon",
                  title: "",
                  sortable: false,
                  render: (condition) => <IconChevronRight />,
                },
              ]}
            />
            <FhirPagination data={paginatedConditions} {...searchController} />
          </FhirQueryLoader>
        </Box>
      </Stack>
    </Paper>
  );
}
