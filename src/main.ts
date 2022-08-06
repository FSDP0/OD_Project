import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import * as dotenv from "dotenv";
import * as path from "path";
import helmet from "helmet";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";

declare const module: any;

dotenv.config({
   path: path.resolve(
      process.env.NODE_ENV === "production" ? ".prod.env" : "dev.env",
   ),
});
async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   const configService = app.get(ConfigService);

   const port = configService.get<number>("SERVER_PORT");

   app.use(helmet())
      .use(cookieParser())
      .useGlobalPipes(
         new ValidationPipe({
            transform: true,
            forbidNonWhitelisted: true, // DTO에 정의되어 있지 않는 Property를 body를 통해 전송 시, Error
            whitelist: true,
         }),
      );

   await app.listen(port);

   Logger.log(`Server Running at ${port}`);

   // Hot Relaoder
   if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
   }
}
bootstrap();
