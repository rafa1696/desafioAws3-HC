import { Lead } from '../models/lead'

export async function getLeads(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'private')

  const leadClient = ctx.clients.aws
  const response = await leadClient.getLeads()

  ctx.body = Lead.mapperToLeads(response)

  await next()
}
