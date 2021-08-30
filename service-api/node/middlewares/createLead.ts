import { json } from 'co-body'
import { Lead } from '../models/lead'

export async function createLead(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'private')

  const awsClient = ctx.clients.aws
  const body = await json(ctx.req)
  const lead = new Lead(
    body.name,
    body.email,
    body.phone,
    new Date().toString(),
    '',
    'prospect'
  )

  const result = await awsClient.createLead(lead)

  ctx.body = result

  await next()
}
