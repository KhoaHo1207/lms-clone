import { env } from "@/config/env.js";
import server from "./app.js";

const PORT = env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${env.NODE_ENV} mode`);
});

export default server;
