import dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  baseURL: getEnv('BASE_URL'),
//   userEmail: getEnv('USER_EMAIL'),
//   userPassword: getEnv('USER_PASSWORD'),
} as const;