import { AppClient, InstanceOptions, IOContext } from '@vtex/api'
// import { ExternalClient } from '@vtex/api'

export default class Catalog extends AppClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, options)
  }

  getProducts() {
    return 'ok3';
  }
}
