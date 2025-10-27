import z, { flattenError } from "zod";
import { config } from "dotenv";
config();

export const envSchema = z.object({
  ENVIRONMENT: z
    .enum(["development", "production", "test"])
    .default("development"),
  JWT_SECRET: z.coerce.string().min(1, "JWT_SECRET is required"),
  APP_URL: z.coerce.string().min(1, "APP_URL is required"),
  PORT: z.coerce.number().min(1, "PORT must be a valid number").default(8000),
  DATABASE: z
    .enum(["mysql", "postgres", "sqlite", "cockroachdb"])
    .default("postgres"),
  DATABASE_URL: z.coerce.string().min(1, "DATABASE_URL is required").optional(),
  DATABASE_HOST: z.coerce.string().optional(),
  DATABASE_PORT: z.coerce.number().optional(),
  DATABASE_USERNAME: z.coerce.string().optional(),
  DATABASE_PASSWORD: z.coerce.string().optional(),
});

export type EnvSchema = z.infer<typeof envSchema>;

export const envConfig = (): EnvSchema => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment configuration:",
      flattenError(parsed.error)
    );
    throw new Error("Invalid environment variables");
  }
  console.log(
    " ✅ Loaded environment:"
    // parsed.data
  );
  return parsed.data;
};

export const env = envConfig();
