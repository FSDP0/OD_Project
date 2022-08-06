import { Injectable } from "@nestjs/common";

import { FcmService } from "nestjs-fcm";

@Injectable()
export class FirebaseService {
   constructor(private readonly fcmService: FcmService) {}

   async sendNotification() {
      await this.fcmService.sendNotification(
         [],
         {
            data: {
               title: "Example Title",
               body: "Example Body",
            },
         },
         false,
      );
   }
}
