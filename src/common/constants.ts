import { EnvService } from 'src/env/env.service'

export const jwtConstants = {
  secret: new EnvService().read().JWT_SECRET,
}
