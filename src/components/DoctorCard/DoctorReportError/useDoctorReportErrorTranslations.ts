import { useTranslation } from 'next-i18next';

import type { ReportErrorTranslations } from './types';

const useDoctorReportErrorTranslations = () => {
  const { t: tReportError } = useTranslation('dr-report-error');

  const buttons: ReportErrorTranslations['buttons'] = tReportError('buttons', {
    returnObjects: true,
  });
  const groups: ReportErrorTranslations['groups'] = tReportError('groups', {
    returnObjects: true,
  });
  const inputs: ReportErrorTranslations['inputs'] = tReportError('inputs', {
    returnObjects: true,
  });
  const yes = tReportError('yes');
  const no = tReportError('no');

  const notifications: ReportErrorTranslations['notification'] = tReportError(
    'notification',
    {
      returnObjects: true,
    }
  );

  return {
    buttons,
    groups,
    inputs,
    yes,
    no,
    notifications,
    tReportError,
  };
};

export default useDoctorReportErrorTranslations;
