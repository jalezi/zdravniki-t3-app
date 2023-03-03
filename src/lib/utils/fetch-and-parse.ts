import type { ParseResult } from 'papaparse';
import Papa from 'papaparse';

import { DATA_URL } from '../constants';
import type { DrCSV } from '../types/doctors';
import type { InstCSV } from '../types/institutions';

const { DOCTORS_CSV_URL, INSTITUTIONS_CSV_URL } = DATA_URL;

export function fetchDrAndInstData() {
  return Promise.all([fetch(DOCTORS_CSV_URL), fetch(INSTITUTIONS_CSV_URL)]);
}

export const PARSE_OPTIONS = {
  header: true,
  skipEmptyLines: true,
} as const;

type FetchDrAndInstDataAndParse = {
  doctorsParsedFromCsv: ParseResult<DrCSV>;
  institutionsParsedFromCsv: ParseResult<InstCSV>;
};
export const fetchDrAndInstDataAndParse = async () => {
  const [doctorsResponse, institutionsResponse] = await fetchDrAndInstData();

  if (!doctorsResponse.ok || !institutionsResponse.ok) {
    const doctorsStatus = doctorsResponse.status;
    const institutionsStatus = institutionsResponse.status;

    throw new Error(
      `Failed to fetch data; doctors: ${doctorsStatus}, institutions: ${institutionsStatus}`
    );
  }

  const doctorsResult = await doctorsResponse.text();
  const institutionsResult = await institutionsResponse.text();

  const doctorsParsedFromCsv = Papa.parse(doctorsResult, PARSE_OPTIONS);
  const institutionsParsedFromCsv = Papa.parse(
    institutionsResult,
    PARSE_OPTIONS
  );

  return {
    doctorsParsedFromCsv,
    institutionsParsedFromCsv,
  } as unknown as FetchDrAndInstDataAndParse;
};
