"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = exports.envConfig = exports.envSchema = void 0;
const zod_1 = __importStar(require("zod"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.envSchema = zod_1.default.object({
    ENVIRONMENT: zod_1.default
        .enum(["development", "production", "test"])
        .default("development"),
    JWT_SECRET: zod_1.default.coerce.string().min(1, "JWT_SECRET is required"),
    APP_URL: zod_1.default.coerce.string().min(1, "APP_URL is required"),
    PORT: zod_1.default.coerce.number().min(1, "PORT must be a valid number").default(8000),
    DATABASE: zod_1.default
        .enum(["mysql", "postgres", "sqlite", "cockroachdb"])
        .default("postgres"),
    DATABASE_URL: zod_1.default.coerce.string().min(1, "DATABASE_URL is required").optional(),
    DATABASE_HOST: zod_1.default.coerce.string().optional(),
    DATABASE_PORT: zod_1.default.coerce.number().optional(),
    DATABASE_USERNAME: zod_1.default.coerce.string().optional(),
    DATABASE_PASSWORD: zod_1.default.coerce.string().optional(),
});
const envConfig = () => {
    const parsed = exports.envSchema.safeParse(process.env);
    if (!parsed.success) {
        console.error("❌ Invalid environment configuration:", (0, zod_1.flattenError)(parsed.error));
        throw new Error("Invalid environment variables");
    }
    console.log(" ✅ Loaded environment:");
    return parsed.data;
};
exports.envConfig = envConfig;
exports.env = (0, exports.envConfig)();
//# sourceMappingURL=env.config.js.map