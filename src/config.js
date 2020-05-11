import dotenv from 'dotenv'
dotenv.config()

export const PORT = Number(process.env.PORT) || 3000

export const DB_HOST = process.env.DB_HOST || '127.0.0.1'
export const DB_PORT = Number(process.env.DB_PORT) || 5432
export const DB_USERNAME = process.env.DB_USERNAME || ''
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_NAME = process.env.DB_NAME || 'internetBanking'

export const SALT_ROUNDS = process.env.SALT_ROUNDS