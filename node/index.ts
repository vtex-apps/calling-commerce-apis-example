import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import { validateCollectionProps } from './middlewares/validateCollection'
import { validateProductTitle } from './middlewares/validateProductTitle'

const TIMEOUT_MS = 800

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    id: number
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    validateSku: method({
      GET: [validateProductTitle],
    }),
    validateCollection: method({
      GET: [validateCollectionProps],
    }),
  },
})
