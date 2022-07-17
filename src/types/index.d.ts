import { Token_Payload } from "../common/interface/payload.interface";

declare global {
   namespace Express {
      interface User extends Token_Payload {}

      export interface Request {
         user?: User;
      }
   }
}
