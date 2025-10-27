import { env } from "./env.config";
import { EnvSchema } from "./env.config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource as AppDataSource } from "typeorm";
import { DataSourceOptions } from "typeorm";
import { Logger } from "@nestjs/common";
const logger = new Logger();
const Env: EnvSchema = env;
import { User, Link, File, Session } from "src/database/entities/index.entity";

export const DataSource = (): TypeOrmModuleOptions => ({
  type: Env.DATABASE as any,
  ...(Env.DATABASE_URL ? { url: Env.DATABASE_URL } : {}),
  ...(Env.DATABASE_HOST ? { host: Env.DATABASE_HOST } : {}),
  ...(Env.DATABASE_PORT ? { port: Env.DATABASE_PORT } : {}),
  ...(Env.DATABASE_USERNAME ? { username: Env.DATABASE_USERNAME } : {}),
  ...(Env.DATABASE_PASSWORD ? { password: Env.DATABASE_PASSWORD } : {}),
  entities: [User, Link, File, Session],
  migrations: [`${__dirname}/database/migrations/*.{ts,js}`],
  autoLoadEntities: true,
  synchronize: Env.ENVIRONMENT === "development" ? true : false,
  logging: env.ENVIRONMENT === "development",
  migrationsRun: env.ENVIRONMENT !== "development", // Only auto-run in production
  migrationsTableName: "migrations",
});

const connection = new AppDataSource({
  type: `${Env.DATABASE}`,
  ...(Env.DATABASE_URL ? { url: Env.DATABASE_URL } : {}),
  ...(Env.DATABASE_HOST ? { host: Env.DATABASE_HOST } : {}),
  ...(Env.DATABASE_PORT ? { port: Env.DATABASE_PORT } : {}),
  ...(Env.DATABASE_USERNAME ? { username: Env.DATABASE_USERNAME } : {}),
  ...(Env.DATABASE_PASSWORD ? { password: Env.DATABASE_PASSWORD } : {}),
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  autoLoadEntities: true,
  synchronize: Env.ENVIRONMENT === "development" ? true : false,
  logging: env.ENVIRONMENT === "development",
  migrationsRun: env.ENVIRONMENT !== "development", // Only auto-run in production
  migrationsTableName: "migrations",
} as DataSourceOptions);

if (require.main === module) {
  try {
    connection.initialize();

    logger.log("Database connection established");
  } catch (err) {
    logger.error("Database connection failed");
    process.exit(1);
  }
}
