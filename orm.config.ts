import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SecretsManager } from 'aws-sdk';

dotenv.config(); // Load environment variables from .env file
let config: ConnectionOptions;

async function initializeDB() {
  if (!process.env.DB_HOST) {
    await setProdConfig();
  } else {
    // await setProdConfig();
    setLocalConfig();
  }
}

initializeDB();

function setLocalConfig() {
  config = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'my-password',
    database: process.env.DB_NAME || 'my-db',
    entities: ['dist/**/*.entity.js'],
    migrations: ['src/migrations/**/*.{ts,js}'],
    synchronize: true,
    logging: false,
  };
}

async function setProdConfig() {
  const awsSecret = await getAWSSecret();
  config = {
    type: 'mysql',
    host: awsSecret['DB_HOST'],
    port: 3306,
    username: awsSecret['DB_USER'],
    password: awsSecret['DB_PASSWORD'],
    database: awsSecret['DB_NAME'],
    entities: ['dist/**/*.entity.js'],
    migrations: ['src/migrations/**/*.{ts,js}'],
    synchronize: true,
    logging: false,
  };
}

async function getAWSSecret(): Promise<any> {
  const secretsManager = new SecretsManager({
    region: 'eu-west-1',
  });

  const secretName = 'IDEAL-WORD-DB';
  const secret = await secretsManager
    .getSecretValue({ SecretId: secretName })
    .promise();

  // console.log('SECRET', secret);
  if ('SecretString' in secret) {
    return JSON.parse(secret.SecretString || '');
  }

  throw new Error('Unable to retrieve AWS secret.');
}

// The entities property is the one that is causing the error:
// https://stackoverflow.com/questions/59435293/typeorm-entity-in-nestjs-cannot-use-import-statement-outside-a-module

export default config;
