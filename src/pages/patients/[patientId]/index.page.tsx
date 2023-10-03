import { useRouter } from "next/router";

export default function Patient() {
  const router = useRouter();
  if (!router.query.patientId) return null;
  router.push(`/patients/${router.query.patientId}/overview`);
}
