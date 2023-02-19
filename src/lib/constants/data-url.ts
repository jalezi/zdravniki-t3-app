export const ORIGIN = 'https://raw.githubusercontent.com' as const;
export const BASE_URL = new URL(ORIGIN);

export const BASE_PATH = '/sledilnik/zdravniki-data/main/csv' as const;

export const INSTITUTIONS_CSV_PATH = `${BASE_PATH}/institutions.csv` as const;
export const DOCTORS_CSV_PATH = `${BASE_PATH}/doctors.csv` as const;

export const DOCTORS_TS_PATH = `${BASE_PATH}/doctors.csv.timestamp` as const;
export const INSTITUTIONS_TS_PATH =
  `${BASE_PATH}/institutions.csv.timestamp` as const;

export const INSTITUTIONS_CSV_URL = new URL(INSTITUTIONS_CSV_PATH, BASE_URL);
export const DOCTORS_CSV_URL = new URL(DOCTORS_CSV_PATH, BASE_URL);
export const DOCTORS_TS_URL = new URL(DOCTORS_TS_PATH, BASE_URL);
export const INSTITUTIONS_TS_URL = new URL(INSTITUTIONS_TS_PATH, BASE_URL);
