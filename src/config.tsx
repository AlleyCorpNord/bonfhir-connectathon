export const Config = {
  public: {
    fhirUrl:
      process.env.NEXT_PUBLIC_FHIR_URL ||
      "https://api.medplum.alleycorpnord.com/fhir/R4/",
  },
  server: {
    authServerUrl:
      process.env.AUTH_SERVER_URL || "https://api.medplum.alleycorpnord.com",
    authTokenUrl:
      process.env.AUTH_TOKEN_URL ||
      "https://api.medplum.alleycorpnord.com/oauth2/token",
    logoutUrl:
      process.env.LOGOUT_URL ||
      "https://api.medplum.alleycorpnord.com/oauth2/logout",
    authClientId:
      process.env.AUTH_CLIENT_ID || "4676be68-5f51-4056-b3da-3229b49d4292",
    authClientSecret:
      process.env.AUTH_CLIENT_SECRET ||
      "36bf0707b0c8e553ccc3e8e9e30d8b0b36ea76e7e5cb6c4f26414eb41fcd5271",
    authSecret: process.env.AUTH_SECRET || "secret",
    appBaseUrl:
      process.env.APP_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://host.docker.internal:3000"),
    fhirSubscriptionsSecret: process.env.FHIR_SUBSCRIPTION_SECRET || "secret",
  },
} as const;
