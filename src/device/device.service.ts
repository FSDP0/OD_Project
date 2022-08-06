import { Injectable } from "@nestjs/common";
import { FcmService } from "nestjs-fcm";

@Injectable()
export class DeviceService {
   constructor(private readonly fcmService: FcmService) {}

   async doStuff() {
      await this.fcmService.sendNotification(
         [
            "dRVHRO3fQ_iuJLx_wkOvuK:APA91bFHRwbdyZLwpLPvh_D9c5IDacjDovVz3DaJgDveEa53sNid6MHHZ5iInyQ79VCeoTtrP7cRnoCyghRgmdmtgJna-YjCxH_63BXOTSlttwEK98D97nCjAgu9c4AsxP9SWc-kq_lo",
         ],
         {
            data: {
               title: "안녕하세요",
               body: "진짜 잘 가네요?",
            },
         },
         false,
      );
   }
}
