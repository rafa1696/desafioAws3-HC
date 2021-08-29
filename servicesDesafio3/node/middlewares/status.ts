import { UserInputError } from '@vtex/api'

export async function status(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
  } = ctx

  console.info('Received params:', params)

  const { code } = params

  if (!code) {
    throw new UserInputError('Code is required') // Wrapper for a Bad Request (400) HTTP Error. Check others in https://github.com/vtex/node-vtex-api/blob/fd6139349de4e68825b1074f1959dd8d0c8f4d5b/src/errors/index.ts
  }

  const codeNumber = parseInt(code as string, 10)

  const res = await ctx.clients.status.getStatus(codeNumber).catch(reason => {
    return reason?.response?.data
  })
  ctx.set('Cache-Control', 'no-cache no-store')
  ctx.body = res
  ctx.status = codeNumber

  await next()
}
