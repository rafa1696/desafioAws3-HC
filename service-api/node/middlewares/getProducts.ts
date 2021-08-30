export async function getProducts(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'private')

  const catalogClient = ctx.clients.catalog

  const { data: products } = await catalogClient.getProductsAndSkus()
  const skus = []

  for (const product of Object.keys(products)) {
    for (const skuId of products[product]) {
      /* eslint-disable no-await-in-loop */
      const sku = await catalogClient.getSkuContext(skuId)

      skus.push(sku)
    }
  }

  ctx.body = skus

  await next()
}
