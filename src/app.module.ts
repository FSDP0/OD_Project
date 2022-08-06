import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

// import { AppService } from "./app.service";
import * as Joi from "joi";
import * as path from "path";
import { FcmModule } from "nestjs-fcm";

import { LoggerMiddleware } from "./common/middleware/logger.middleware";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

import { DatabaseModule } from "./config/database/database.module";
import { DeviceModule } from "./device/device.module";

@Module({
   imports: [
      AuthModule,
      UsersModule,
      FcmModule.forRoot({
         firebaseSpecsPath: path.resolve("./firebase.spec.json"),
      }),
      DatabaseModule,
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath:
            process.env.NODE_ENV === "production" ? ".prod.env" : ".dev.env",
         validationSchema: Joi.object({
            NODE_ENV: Joi.string()
               .valid("development", "production")
               .default("development")
               .required(),
            SERVER_PORT: Joi.number().required().default(3000),
            SECRET_KEY: Joi.string().required(),
            DATABASE_HOST: Joi.string().required().default("localhost"),
            DATABASE_PORT: Joi.number().required(),
            DATABASE_USERNAME: Joi.string().required().default("root"),
            DATABASE_PASSWORD: Joi.string().required(),
            DATABASE_NAME: Joi.string().required(),
         }),
      }),
      DeviceModule,
   ],
   // providers: [AppService],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes("auth");
   }
}
