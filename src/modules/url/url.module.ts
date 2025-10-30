import { Module } from "@nestjs/common";
import { UrlService } from "./url.service";
import { UrlController } from "./url.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Link } from "src/database/entities/index.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [UrlController],
  providers: [UrlService],
  exports: [UrlService],
})
export class UrlModule {}
