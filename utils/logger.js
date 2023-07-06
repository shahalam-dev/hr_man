const { createLogger, transports, format } = require("winston");

exports.logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [
    // new transports.Console(),
    new transports.File({
      filename: "error.log",
      level: "error",
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.splat(),
        format.prettyPrint()
      ),
    }),
  ],
});
