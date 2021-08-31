import { Lead } from '../models/lead'

export async function watchOrder(
  ctx: StatusChangeContext,
  next: () => Promise<any>
) {
  const { orderId } = ctx.body

  const orderClient = ctx.clients.order
  const awsClient = ctx.clients.aws

  if (orderId) {
    const order = await orderClient.order(ctx.body.orderId)

    const { phone } = order.clientProfileData

    console.log(order)
    console.log(phone)

    if (!phone) {
      await next()

      return
    }

    const response = await awsClient.getLeads()
    const leads = Lead.mapperToLeads(response)

    const leadToClient = Lead.getLeadeByPhone(phone as string, leads)

    if (leadToClient) {
      leadToClient.convertToClient()
      await awsClient.updateLead(leadToClient)
      await next()

      return
    }
  }

  await next()
}
