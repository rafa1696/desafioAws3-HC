import { json } from 'co-body'

import { Lead } from '../models/lead'

export async function updateLead(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'private')
  const { leadId } = ctx.vtex.route.params

  const leadClient = ctx.clients.aws
  const body = await json(ctx.req)

  const response = await leadClient.getLeadById(leadId as string)
  const lead = Lead.mapperToLead(response)

  if (!lead) {
    ctx.body = {
      message: 'lead does not found',
    }

    await next()

    return
  }

  lead.email = body.email
  lead.name = body.name
  lead.phone = body.phone
  lead.clientAt = body.clientAt
  lead.prospectAt = body.prospectAt
  lead.type = body.type

  const result = await leadClient.updateLead(lead)

  ctx.body = result
  ctx.status = 201

  await next()
}
