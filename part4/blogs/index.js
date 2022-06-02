const config = require("./utils/config");
const http = require("http");
const app = require("./app");
const logger = require("./utils/logger");

const server = http.createServer(app);

const port = config.PORT;
server.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
