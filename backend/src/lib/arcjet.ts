import { ENV } from "@/config/env.js";
import arcjet, {
  detectBot,
  protectSignup,
  shield,
  slidingWindow,
} from "@arcjet/node";

const arcjetBase = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
  ],
});

const bots = () =>
  detectBot({
    mode: "LIVE",
    allow: [],
  });

export const shieldClient = arcjetBase;

export const loginClient = arcjetBase.withRule(bots()).withRule(
  slidingWindow({
    mode: "LIVE",
    interval: "10m",
    max: 10,
  }),
);

export const verifyEmailClient = arcjetBase.withRule(bots()).withRule(
  slidingWindow({
    mode: "LIVE",
    interval: "10m",
    max: 10,
  }),
);

export const resendOtpClient = arcjetBase.withRule(bots()).withRule(
  slidingWindow({
    mode: "LIVE",
    interval: "10m",
    max: 5,
  }),
);

export const registerClient = arcjetBase.withRule(
  protectSignup({
    email: {
      mode: "LIVE",
      deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    },
    bots: {
      mode: "LIVE",
      allow: [],
    },
    rateLimit: {
      mode: "LIVE",
      interval: "10m",
      max: 5,
    },
  }),
);
