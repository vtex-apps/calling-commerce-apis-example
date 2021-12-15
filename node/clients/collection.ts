import { JanusClient } from '@vtex/api'

import type { Collection } from '../typings/collection'

export class CollectionClient extends JanusClient {
  public async getCollection(collectionId: string) {
    const collection = await this.http.get<Collection>(
      `/api/catalog/pvt/collection/${collectionId}`,
      {
        headers: { VtexIdclientAutCookie: this.context.authToken },
      }
    )

    return collection
  }
}
