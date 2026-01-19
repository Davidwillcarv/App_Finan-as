export function formatCurrency(value, currency) {
  const map = {
    BRL: 'pt-BR',
    USD: 'en-US',
    EUR: 'de-DE'
  }

  return new Intl.NumberFormat(map[currency], {
    style: 'currency',
    currency
  }).format(value)
}
