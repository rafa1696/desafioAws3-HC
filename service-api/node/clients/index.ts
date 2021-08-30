import { IOClients } from '@vtex/api'
import { Catalog, OMS } from '@vtex/clients'

import Status from './status'
import AWS from './aws'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get order() {
    return this.getOrSet('order', OMS)
  }

  public get aws() {
    return this.getOrSet('aws', AWS)
  }
}
