import { CartItem } from '@/types/product';
import { WHATSAPP_NUMBER } from './social-links';

export function buildWhatsAppLink(cart: CartItem[]): string {
  if (cart.length === 0) return '';

  const formatter = new Intl.NumberFormat('ru-KZ', {
    style: 'currency',
    currency: 'KZT',
    maximumFractionDigits: 0,
  });

  const BASE_URL = 'https://tomiriscollectionastana.kz';

  const itemsText = cart
    .map((item, index) => {
      const linePrice = formatter.format(item.product.price * item.quantity);
      const barcode = item.product.barcode || '—';
      const photoUrl = item.product.images?.[0]
        ? `${BASE_URL}${item.product.images[0]}`
        : null;
      const photoLine = photoUrl ? `\n   📸 ${photoUrl}` : '';
      return `${index + 1}. *${item.product.nameRu}* (${item.product.metal ? item.product.metal + ', ' : ''}${item.product.purity} пр., штрихкод: ${barcode}) — ${item.quantity} шт. — ${linePrice}${photoLine}`;
    })
    .join('\n\n');

  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalText = formatter.format(totalPrice);

  const message = `Здравствуйте! Хочу оформить заказ:\n\n${itemsText}\n\n*Итого: ${totalText}*`;
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
