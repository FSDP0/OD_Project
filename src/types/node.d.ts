declare namespace NodeJS {
   interface Process {
      isServer: boolean;
   }

   interface ProcessEnv {
      [key: string]: string;
   }
}
