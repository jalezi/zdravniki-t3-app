import type { ParseResult } from 'papaparse';
import Papa from 'papaparse';

import type { LatLngLiteral } from '@/lib/types/Map';

import { DATA_URL } from '../constants';
import { SL_CENTER } from '../constants/map';
import type { DrAddress, DrCSV, DrLocation } from '../types/doctors';
import type { InstAddress, InstCSV, InstLocation } from '../types/institutions';

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

type Source = 'dr' | 'inst' | 'dummy';
type Address = NonNullable<DrAddress & InstAddress>;

const DummyAddress = {
  street: '',
  city: '',
  fullAddress: '',
  municipality: '',
  municipalityPart: '',
  postalCode: 0,
  postalName: '',
  searchAddress: '',
  post: '',
} satisfies Address;

/**
 * @description Get address from doctor or institution
 * @param drAddress
 * @param instAddress
 * @returns
 */
export const getDoctorsAddress = (
  drAddress: DrAddress,
  instAddress: InstAddress | undefined
): { address: Address; source: Source } => {
  if (drAddress) {
    return { address: drAddress, source: 'dr' };
  }
  if (instAddress) {
    return { address: instAddress, source: 'inst' };
  }
  return { address: DummyAddress, source: 'dummy' };
};

const DummyGeoLocation = {
  lat: SL_CENTER[0],
  lng: SL_CENTER[1],
} satisfies LatLngLiteral;

/**
 * @description Get geo location from doctor or institution
 * @param drGeoLocation
 * @param instGeoLocation
 * @returns
 */
export const getDoctorsGeoLocation = (
  drGeoLocation: LatLngLiteral | null,
  instGeoLocation: LatLngLiteral | null | undefined
): {
  geoLocation: LatLngLiteral;
  source: Source;
} => {
  if (drGeoLocation) {
    return { geoLocation: drGeoLocation, source: 'dr' };
  }
  if (instGeoLocation) {
    return { geoLocation: instGeoLocation, source: 'inst' };
  }
  return {
    geoLocation: DummyGeoLocation,
    source: 'dummy',
  };
};

/**
 * @description Get location from doctor or institution
 * @param drLocation
 * @param instLocation
 * @returns
 */
export const getDrLocation = (
  drLocation: DrLocation,
  instLocation: InstLocation | undefined
) => {
  const address = getDoctorsAddress(drLocation.address, instLocation?.address);
  const geoLocation = getDoctorsGeoLocation(
    drLocation.geoLocation,
    instLocation?.geoLocation
  );

  return {
    address: address.address,
    geoLocation: geoLocation.geoLocation,
    meta: { address: address.source, geoLocation: geoLocation.source },
  };
};
