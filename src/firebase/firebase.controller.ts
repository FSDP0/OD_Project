import { Get, Controller } from "@nestjs/common";
import { FirebaseService } from "./firebase.service";

@Controller("Firebase")
export class FirebaseController {
   constructor(private firebaseService: FirebaseService) {}

   @Get("Push")
   async sendData(): Promise<any> {
      this.firebaseService.sendNotification();

      return "Test Progress";
   }
}
