import {
  urlOrEmailTransformSchema,
  urlTransformSchema,
} from '@/lib/types/doctors';
import type { Doctor } from '@/server/api/routers/doctors';

import DoctorOrderForm from './DoctorOrderForm';
import DoctorWebsite from './DoctorWebsite';
import { Button } from '../Shared/Buttons';
import { Icon } from '../Shared/Icons';

type DoctorContactsProps = {
  email: Doctor['email'];
  websites: Doctor['websites'];
  phones: Doctor['phones'];
  orderform: Doctor['orderform'];
  orderformText: string;
};

const DoctorContacts = ({
  email,
  websites,
  phones,
  orderform,
  orderformText,
}: DoctorContactsProps) => {
  const orderformParsed = urlOrEmailTransformSchema.safeParse(orderform);

  return (
    <>
      {websites.map((website, i) => {
        const websiteUrl = urlTransformSchema.safeParse(website);
        return websiteUrl.success ? (
          <DoctorWebsite
            key={`${websiteUrl.data.href}_${i}`}
            href={websiteUrl.data.href}
            host={websiteUrl.data.host.replaceAll('www.', '')}
            text={websiteUrl.data.href
              .replace(websiteUrl.data.host, '')
              .replace(websiteUrl.data.protocol, '')
              .replace('//', '')
              .replace(/\/+$/, '')}
          />
        ) : null;
      })}
      {phones.map(phone =>
        phone ? (
          <Button key={phone} as="a" href={`tel: ${phone}`} container="span">
            <Icon name="Phone" size="xxl" /> {phone}
          </Button>
        ) : null
      )}
      {email ? (
        <Button as="a" href={`mailto: ${email}`} container="span">
          <Icon name="EmailSvg" size="xxl" /> {email}
        </Button>
      ) : null}

      {orderformParsed.success && (
        <DoctorOrderForm
          href={
            orderformParsed.data.type === 'url'
              ? orderformParsed.data.value
              : `mailto: ${orderformParsed.data.value}`
          }
          variant={orderformParsed.data.type}
          text={orderformText}
        />
      )}
    </>
  );
};

export default DoctorContacts;
