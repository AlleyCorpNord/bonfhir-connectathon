![bonFHIR logo](https://bonfhir.dev/img/bonfhir_logo.svg)

What's a FHIR connectathon?  
https://www.hl7.org/events/fhir-connectathon/index.cfm

## Useful links

- App repo: https://github.com/AlleyCorpNord/bonfhir-hackaton
- List of issues to grab: https://github.com/AlleyCorpNord/bonfhir-hackaton/issues
- UI designs in Figma: https://www.figma.com/file/zzwERZITPWoLDgMW5SlLRY/bonFHIR-%7C-EHR-Demo?type=design&node-id=1%3A15&mode=dev
- bonFHIR Documentation: https://bonfhir.dev
- bonFHIR Storybook: https://bonfhir.dev/storybook
- FHIR documentation: https://hl7.org/fhir/R4B/ (be careful to look at **R4B** and not the latest which is R5)
- Next.js documentation: https://nextjs.org/docs
- Mantine documentation: https://mantine.dev/
- TanStack Query v4: https://tanstack.com/query/v4/docs/react/overview (**v4** - used by all the data fetching hooks)

## Environments

- 👩‍⚕️ Medplum app: https://app.medplum.alleycorpnord.com/
  - Connect with your email + `medplum_admin` as password
- 🚀 This app deployed: https://ehr.alleycorpnord.com/
  - Same as medplum to connect

## Get started

0. Prerequisite: [install Node.js](https://nodejs.org/en/download) (v18+ / LTS recommended).

1. Clone the repository
   `git clone https://github.com/AlleyCorpNord/bonfhir-hackaton.git`

2. Install dependencies
   `npm install`

3. Run the project
   `npm run dev`

## Useful snippets

### Read a single FHIR resource and display a simple value

```tsx
const params = useParams<{ patientId: string }>();
const patientQuery = useFhirRead("Patient", params.patientId);

return <FhirValue type="date" value={patientQuery.data?.birthDate} />;
```

### Read a list and display a paginated table

```tsx
// The search controller coordinates the pagination
// between the query, the table and the pagination
const searchController = useFhirSearchControllerNext<PatientSortOrder>("q", {
  defaultSort: "name",
});

// For pagination to work the total must be requested and
// the `searchController.pageUrl` must be passed to the search as well
const patientsQuery = useFhirSearch(
  "Patient",
  (search) =>
    search
      ._total("accurate")
      ._count(searchController.pageSize)
      ._sort(searchController.sort),
  searchController.pageUrl,
);

return (
  <Paper>
    <Stack>
      <Title order={3}>Patients</Title>
      <Box>
        <FhirQueryLoader query={patientsQuery}>
          <FhirTable
            {...patientsQuery}
            {...searchController}
            onRowNavigate={(patient) => `/patients/${patient.id}`}
            columns={[
              {
                key: "name",
                title: "Name",
                sortable: true,
                render: (patient) => (
                  <FhirValue type="HumanName" value={patient.name} />
                ),
              },
            ]}
          />
          <FhirPagination {...patientsQuery} {...searchController} />
        </FhirQueryLoader>
      </Box>
    </Stack>
  </Paper>
);
```

## Update a single FHIR resource in a controlled way

```tsx
const params = useParams<{ patientId: string }>();
const router = useRouter();

// The `useFhirResourceForm` does the whole read/update cycle
// If you need more fine-grained control, `useFhirForm` will do.
// See https://mantine.dev/form/use-form/ for more information as well.
const form = useFhirResourceForm({
  id: params.patientId,
  type: "Patient",
  mutationOptions: {
    onSuccess(patient) {
      router.push(`/patients/${patient.id}`);
    },
  },
});

return (
  <Paper>
    <Stack>
      <Title order={3}>Edit patient</Title>
      <form onSubmit={form.onSubmit}>
        <Stack>
          <LoadingOverlay visible={form.query.isInitialLoading} />
          <FhirInput
            type="date"
            label="Date of Birth"
            {...form.getInputProps("birthDate")}
          />
          <FhirInputArray
            label="Name"
            min={1}
            {...form.getArrayInputProps("name", { newValue: {} })}
          >
            {({ index }) => {
              return (
                <FhirInput
                  type="HumanName"
                  mode="simple"
                  {...form.getInputProps(`name.${index}`)}
                />
              );
            }}
          </FhirInputArray>
          <Group mt="md">
            <Button type="submit" loading={form.mutation.isLoading}>
              Save
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  </Paper>
);
```
