export async function getSkuById(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'private')

  const catalogClient = ctx.clients.catalog
  const { skuId } = ctx.vtex.route.params

  const sku = await catalogClient.getSkuById(skuId as string)

  if (!sku) {
    ctx.body = {
      message: 'sku does not found',
    }
    ctx.status = 401

    await next()

    return
  }

  ctx.body = sku
  ctx.status = 200

  await next()
}
