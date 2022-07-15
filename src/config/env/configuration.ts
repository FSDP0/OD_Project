export default () => ({
   port: +process.env.SERVER_PORT,
   salt: process.env.SECRET_SALT,
});
