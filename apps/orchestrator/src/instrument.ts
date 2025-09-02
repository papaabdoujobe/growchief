import * as Sentry from "@sentry/nestjs";
//  profiling
const { nodeProfilingIntegration } = require("@sentry/profiling-node");
//  profiling
// Ensure to call this before requiring any other modules!
Sentry.init({
    initialScope: {
      tags: {
        service: 'orchestrator',
        component: 'nestjs',
      },
      contexts: {
        app: {
          name: 'Growchief Orchestrator',
          version: process.env.NEXT_PUBLIC_APP_VERSION || '0.0.0',
        },
      },
    },
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "",
  //  profiling
  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ? parseFloat(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE) : 0.3,
  profilesSampleRate: process.env.NEXT_PUBLIC_SENTRY_PROFILES_SAMPLE_RATE ? parseFloat(process.env.NEXT_PUBLIC_SENTRY_PROFILES_SAMPLE_RATE) : 0.3,
});