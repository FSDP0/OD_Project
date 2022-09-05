import { Injectable } from "@nestjs/common";

import { FcmService } from "nestjs-fcm";

@Injectable()
export class FirebaseService {
   constructor(private readonly fcmService: FcmService) {}

   async sendNotification() {
      await this.fcmService.sendNotification(
         [
            // Device Token Here
         ],
         {
            notification: {
               // Notification Data Here
            },
            data: {
               // Body Data Here
               title: "Example Title",
               body: "Example Body",
            },
         },
         false,
      );
   }
}
