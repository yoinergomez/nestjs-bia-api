import { INestApplication, Logger } from '@nestjs/common';
import * as morgan from 'morgan';

export const useRequestLogging = (app: INestApplication) => {
  const logger = new Logger('Request');
  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => logger.log(message.replace('\n', '')),
      },
    }),
  );
};
