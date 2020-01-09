import { Module, DynamicModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

import { AppController } from './app.controller'
import { UsersModule } from './users/users.module'
import { EnvModule } from './env/env.module'
import { EnvService } from './env/env.service'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './roles/roles.module';

function DatabaseOrmModule(): DynamicModule {
  const config = new EnvService().read()

  return TypeOrmModule.forRoot({
    type: config.DB_TYPE,
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,

    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['migrations/**/*.ts'],
    subscribers: ['subscriber/**/*.ts', 'dist/subscriber/**/.js'],
    cli: {
      entitiesDir: 'src',
      migrationsDir: 'migrations',
      subscribersDir: 'subscriber',
    },
  })
}

@Module({
  imports: [DatabaseOrmModule(), UsersModule, EnvModule, AuthModule, RolesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
