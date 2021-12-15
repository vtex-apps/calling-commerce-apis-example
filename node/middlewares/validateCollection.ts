import { validateCollection } from '../utils/validateCollection'

export async function validateCollectionProps(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    vtex: {
      route: {
        params: { id },
      },
    },
    clients: { collection },
  } = ctx

  console.info('Received collection id:', id)

  const col = await collection.getCollection(id.toString())

  if (!col) {
    ctx.status = 404

    return
  }

  console.info('Collection:', col)

  ctx.status = 200
  ctx.body = {
    id: col.Id,
    description: col.Description,
    result: validateCollection(col),
  }
  ctx.set('Cache-Control', 'no-cache')

  await next()
}
