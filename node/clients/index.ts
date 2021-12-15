import { IOClients } from '@vtex/api'
import { Catalog } from '@vtex/clients'

import { CollectionClient } from './collection'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get collection() {
    return this.getOrSet('collection', CollectionClient)
  }
}
