import z from "zod";
export declare const envSchema: z.ZodObject<{
    ENVIRONMENT: z.ZodDefault<z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>>;
    JWT_SECRET: z.ZodCoercedString<unknown>;
    APP_URL: z.ZodCoercedString<unknown>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    DATABASE: z.ZodDefault<z.ZodEnum<{
        mysql: "mysql";
        postgres: "postgres";
        sqlite: "sqlite";
        cockroachdb: "cockroachdb";
    }>>;
    DATABASE_URL: z.ZodOptional<z.ZodCoercedString<unknown>>;
    DATABASE_HOST: z.ZodOptional<z.ZodCoercedString<unknown>>;
    DATABASE_PORT: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    DATABASE_USERNAME: z.ZodOptional<z.ZodCoercedString<unknown>>;
    DATABASE_PASSWORD: z.ZodOptional<z.ZodCoercedString<unknown>>;
}, z.core.$strip>;
export type EnvSchema = z.infer<typeof envSchema>;
export declare const envConfig: () => EnvSchema;
export declare const env: {
    ENVIRONMENT: "development" | "production" | "test";
    JWT_SECRET: string;
    APP_URL: string;
    PORT: number;
    DATABASE: "mysql" | "postgres" | "sqlite" | "cockroachdb";
    DATABASE_URL?: string | undefined;
    DATABASE_HOST?: string | undefined;
    DATABASE_PORT?: number | undefined;
    DATABASE_USERNAME?: string | undefined;
    DATABASE_PASSWORD?: string | undefined;
};
