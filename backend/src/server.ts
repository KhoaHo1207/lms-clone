import server from "./app.js";
import { ENV } from "./config/env.js";

server.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});

export default server;
