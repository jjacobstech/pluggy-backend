"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSource = void 0;
const env_config_1 = require("./env.config");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger();
const Env = env_config_1.env;
const index_entity_1 = require("../database/entities/index.entity");
const DataSource = () => ({
    type: Env.DATABASE,
    ...(Env.DATABASE_URL ? { url: Env.DATABASE_URL } : {}),
    ...(Env.DATABASE_HOST ? { host: Env.DATABASE_HOST } : {}),
    ...(Env.DATABASE_PORT ? { port: Env.DATABASE_PORT } : {}),
    ...(Env.DATABASE_USERNAME ? { username: Env.DATABASE_USERNAME } : {}),
    ...(Env.DATABASE_PASSWORD ? { password: Env.DATABASE_PASSWORD } : {}),
    entities: [index_entity_1.User, index_entity_1.Link, index_entity_1.File, index_entity_1.Session],
    migrations: [`${__dirname}/database/migrations/*.{ts,js}`],
    autoLoadEntities: true,
    synchronize: Env.ENVIRONMENT === "development" ? true : false,
    logging: env_config_1.env.ENVIRONMENT === "development",
    migrationsRun: env_config_1.env.ENVIRONMENT !== "development",
    migrationsTableName: "migrations",
});
exports.DataSource = DataSource;
const connection = new typeorm_1.DataSource({
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
    logging: env_config_1.env.ENVIRONMENT === "development",
    migrationsRun: env_config_1.env.ENVIRONMENT !== "development",
    migrationsTableName: "migrations",
});
if (require.main === module) {
    try {
        connection.initialize();
        logger.log("Database connection established");
    }
    catch (err) {
        logger.error("Database connection failed");
        process.exit(1);
    }
}
//# sourceMappingURL=database.config.js.map