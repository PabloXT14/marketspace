export function formatCurrencyMask(value: string) {
  // Remove caracteres não numéricos
  const onlyNumbers = value.replace(/\D/g, '')

  // Converte para centavos
  const cents = Number(onlyNumbers) / 100

  // Formata para moeda brasileira
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
    .format(cents)
    .replace('R$', '')
    .trim()

  return formattedValue
}
