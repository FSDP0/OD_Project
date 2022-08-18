import { Injectable } from "@nestjs/common";
import { FcmService } from "nestjs-fcm";

@Injectable()
export class DeviceService {
   constructor(private readonly fcmService: FcmService) {}

   async doStuff() {
      await this.fcmService.sendNotification(
         [
            "dRVHRO3fQ_iuJLx_wkOvuK:APA91bFHRwbdyZLwpLPvh_D9c5IDacjDovVz3DaJgDveEa53sNid6MHHZ5iInyQ79VCeoTtrP7cRnoCyghRgmdmtgJna-YjCxH_63BXOTSlttwEK98D97nCjAgu9c4AsxP9SWc-kq_lo",
            "d5ZJiBeGTva7cg_HYQaq7x:APA91bHIzZ3Eq6DNBeuqjgLUaF3Qrr10te06knZS9iRFBtwCilHX7_71z49HvQ9o2EzrlkxXh28zrjmdtitNRKsE2Z0BQWm2k9XsNyKuslT6onyWu7lRrAxruXBi5fEx031FTzjrl4Kf",
         ],
         {
            data: {
               title: "환자의 낙상이 감지되었습니다.",
               body: "2번 환자의 낙상이 감지되었습니다. \n 신속한 의료조치가 필요합니다!  ",
            },
         },
         false,
      );
   }
}
