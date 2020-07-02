import { config } from './config/config';
import app from './app';
import logger from './config/logger';

const port = config.app.port;
const name = config.app.name;

app.listen(port, () => {
  logger.info(`${name} started at port ${port}`);
});
