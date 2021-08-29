import type { ClientsConfig, ServiceContext } from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import { status } from './middlewares/status'
import { statusPost } from './middlewares/statusPost'
import { skuById } from './middlewares/skuById'
const TIMEOUT_MS = 800


const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients>

}

export default new Service({
  clients,
  routes: {
    status: method({
      GET: [status]
    }),
    statusPost: method({
      POST: [statusPost]
    }),
    skuById: method({
      GET: [skuById]
    }),
  },
})
