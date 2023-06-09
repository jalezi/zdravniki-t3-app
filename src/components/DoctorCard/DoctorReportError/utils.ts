import type { SendReportInputUserNotNull } from '@/server/api/routers/doctors';

import type { FormData } from './types';

export const getMutationInput = (
  data: FormData
): SendReportInputUserNotNull => {
  const website = data.websites.map(({ website }) => website).join(', ');
  const phone = data.phones.map(({ phone }) => phone).join(', ');
  return {
    accepts: data.accepts,
    address: data.address.trim(),
    email: data.email.trim(),
    note: data.note.trim(),
    phone: phone.trim(),
    orderform: data.orderform.trim(),
    website: website.trim(),
  };
};
