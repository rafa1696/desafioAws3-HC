import { json } from 'co-body'

import { Lead } from '../models/lead'

export async function convertLeadToCliente(
  ctx: Context,
  next: () => Promise<any>
) {
  ctx.set('Cache-Control', 'private')

  const { email } = await json(ctx.req)

  console.log(email)

  if (!email) {
    ctx.body = {
      message: 'does not found email',
    }
    ctx.status = 401
    await next()

    return
  }

  const leadClient = ctx.clients.aws
  const response = await leadClient.getLeads()
  const leads = Lead.mapperToLeads(response)
  const leadToClient = Lead.getLeadeByEmail(email as string, leads)
  console.log(leads);
  console.log(leadToClient)

  if (leadToClient) {
    leadToClient.convertToClient()
    await leadClient.updateLead(leadToClient)
    ctx.status = 200
    await next()

    return
  }

  ctx.status = 401
  ctx.body = {
    message: 'does not found lead for convert to client',
  }
  await next()
}
