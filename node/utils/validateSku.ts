import type { GetSkuResponse } from '@vtex/clients'

export const validateSku = (sku: GetSkuResponse) => {
  if (sku.Name.length < 20) {
    return `O nome do Sku está muito curto! (${sku.Name.length} characteres). O nome deve possuir entre 20 e 80 caracteres.`
  }

  if (sku.Name.length > 80) {
    return `O nome do Sku está muito longo! (${sku.Name.length} characteres). O nome deve possuir entre 20 e 80 caracteres.`
  }

  return 'O nome do Sku está otimizado!'
}
