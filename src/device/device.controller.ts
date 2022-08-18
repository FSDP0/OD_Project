import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { DeviceService } from "./device.service";

// import * as fcm from "firebase-admin";

@Controller("device")
export class DeviceController {
   constructor(private deviceService: DeviceService) {}

   @Post("Data")
   async receiveData(@Body() data): Promise<any> {
      Logger.log("Data : " + data.State);
      return "Received Data : " + data.State;
   }

   @Get("Test")
   async sendData(): Promise<any> {
      this.deviceService.doStuff();

      return "Send Message Success !";
      // let target_token =
      //    "cIr_-RYrR12AsOG2euz3aG:APA91bGkRhrOcc93OW4tKC0hzqUowUUdvgl2FVOd6iU5doVDcEJfd9TmCTkSgm1eogzUVcqL7vJ9MsEbcYOoVjQCnjldoRTW68J2l_SCI0pGs4y6d2nf1ICEXACGOfDOr_iFEN6AXzw-";
      // let message = {
      //    data: {
      //       title: "테스트 데이터 발송",
      //       body: "잘 보내지나요?",
      //       style: "좋군요",
      //    },
      //    token: target_token,
      // };
      // fcm.messaging()
      //    .send(message)
      //    .then((res) => {
      //       Logger.log("Successfully Send Message : ", res);
      //    })
      //    .catch((err) => {
      //       Logger.log("Error Sending Message !! : ", err);
      //    });
   }
}
