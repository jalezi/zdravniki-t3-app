import type { SendReportInput } from '@/server/api/routers/doctors';

import type { FormData } from './types';

export const getMutationInput = (data: FormData): SendReportInput => {
  const website = data.websites.map(({ website }) => website).join(', ');
  const phone = data.phones.map(({ phone }) => phone).join(', ');
  return {
    accepts: data.accepts,
    address: data.address.trim(),
    availability: data.availability.trim(),
    email: data.email.trim(),
    note: data.note.trim(),
    phone: phone.trim(),
    orderform: data.orderform.trim(),
    website: website.trim(),
  };
};
