import { Pool } from 'pg';
import { DB_URL } from '../config/global.env';
import { ConfigService } from '@nestjs/config';

export async function poolFactory(configService: ConfigService) {
  return new Pool({
    connectionString: configService.get('DB_URL'),
  });
}
