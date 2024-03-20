import { createLogger, format, transports } from "winston";

const logWithPayload = format((info) => {
    if (info.payload) {
      info.message = `${info.message} - Payload: ${JSON.stringify(info.payload)}`;
    }
    return info;
  });

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            level: 'warn',
            filename: 'logsWarnings.log'
        }),
        new transports.File({
            level: 'error',
            filename: 'logsErrors.log'
        }),
        new transports.File({
            level: 'info',
            filename: 'logsInfo.log'
        }),
        new transports.File({
            level: 'debug',
            filename: 'logsDebug.log'
        }),
        new transports.File({
            level: 'info',
            filename: '/var/log/webapplogs/logsInfo.log'
        }),
        new transports.File({
            level: 'warn',
            filename: '/var/log/webapplogs/logsWarnings.log'
        }),
        new transports.File({
            level: 'error',
            filename: '/var/log/webapplogs/logsErrors.log'
        }),
        new transports.File({
            level: 'debug',
            filename: '/var/log/webapplogs/logsDebug.log'
        }),

    ],
    format:  format.combine(
        format.timestamp(),
        format.json(),
        logWithPayload(),
        format.prettyPrint()
    )
})

export default logger;