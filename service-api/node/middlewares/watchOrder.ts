import { Lead } from '../models/lead'

export async function watchOrder(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'private')

  //console.log(ctx.route.rapms)
  const { email } = ctx.vtex.route.params

  console.log(email)

  const leadClient = ctx.clients.aws
  const response = await leadClient.getLeads()
  const leads = Lead.mapperToLeads(response)
  const leadToClient = Lead.getLeadeByEmail(email as string, leads)

  if (leadToClient) {
    leadToClient.convertToClient()
    await leadClient.updateLead(leadToClient)
    await next()

    return
  }

  ctx.body = {
    message: 'does not found lead for convert to client',
  }
  await next()
}
