import { validateSku } from '../utils/validateSku'

export async function validateProductTitle(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    vtex: {
      route: {
        params: { id },
      },
    },
    clients: { catalog },
  } = ctx

  console.info('Received sku id:', id)

  const sku = await catalog.getSkuById(id.toString())

  if (!sku) {
    ctx.status = 404

    return
  }

  console.info('Sku:', sku)

  ctx.status = 200
  ctx.body = {
    skuId: sku.Id,
    name: sku.Name,
    result: validateSku(sku),
  }
  ctx.set('Cache-Control', 'no-cache')

  await next()
}
