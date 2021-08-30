export async function orderStatus(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  console.log('sss')
  console.log(ctx)
  await next()
}
