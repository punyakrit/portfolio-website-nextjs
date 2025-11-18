interface Env {
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string;
  NEXT_PUBLIC_CLARITY_ID: string;
}

export const env: Readonly<Env> = {
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string,
  NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID as string,
};