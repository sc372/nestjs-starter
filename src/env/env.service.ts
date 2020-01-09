import * as fs from 'fs'
import * as dotenv from 'dotenv'
import { Env } from './env.interface'

export class EnvService {
  private vars: Env

  constructor() {
    const environment = process.env.NODE_ENV || 'development'
    const data: any = dotenv.parse(
      fs.readFileSync(`./src/env/${environment}.env`),
    )

    data.APP_ENV = environment
    data.APP_DEBUG = data.APP_DEBUG === 'true' ? true : false
    data.DB_PORT = parseInt(data.DB_PORT)

    this.vars = data as Env
  }

  read(): Env {
    return this.vars
  }

  isDev(): boolean {
    return this.vars.APP_ENV === 'development'
  }

  isProd(): boolean {
    return this.vars.APP_ENV === 'production'
  }
}
