export async function getOrders(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'private')

  const oms = ctx.clients.order

  const orders = await oms.listOrders()

  ctx.body = orders

  await next()
}
