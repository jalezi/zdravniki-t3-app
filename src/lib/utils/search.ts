import type { LatLngBounds } from '@/lib/types/Map';
import { boundsIntersect, getDoctorLatLng } from '@/lib/utils/map';
import type { AcceptsHashValueSchema } from '@/lib/utils/url-hash';
import type { Doctor } from '@/server/api/routers/doctors';

/**
 * Replace all non ASCII chars and replace them with closest equivalent (č => c)
 * @description Normalizes string to lowercase, removes diacritics and trims it
 * @param value
 * @returns
 */
export const normalize = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036F]/g, '');
};

/**
 * Check if value contains all parts of query
 * @description Normalizes both name and query, splits query into parts and checks if name contains all parts
 * @param value
 * @param query
 * @returns true if name contains all parts of query
 * @example
 * fullMatch('Jana Nováková', 'Jana Nováková') // true
 */
export const fullMatch = (value: string, query: string) => {
  const normalizedQuery = normalize(query)
    .split(' ')
    .sort((a, b) => b.length - a.length);

  let normalizedName = normalize(value);
  return normalizedQuery.every(part => {
    const includes = normalizedName.includes(part);
    if (includes) {
      normalizedName = normalizedName.replace(part, '');
    }
    return includes;
  });
};

/**
 * Check if some value matches query
 * @description Compares normalized query with normalized values. Returns true if query is part of any value.
 * @param values
 * @param query
 * @returns true if query is part of any value
 */
export const partialMatch = (values: string[], query: string) => {
  const normalizedQuery = normalize(query);
  return values.some(value => normalize(value).includes(normalizedQuery));
};

/**
 * Creates filter function for doctors
 * @param options
 * @returns filter function for doctors based on options
 */
export const createDoctorFilter = (options: {
  accepts: AcceptsHashValueSchema;
  bounds: LatLngBounds;
  search: string;
}) =>
  function (doctor: Doctor) {
    const { accepts, bounds, search } = options;
    const acceptsCondition =
      accepts === 'all' ? true : doctor.accepts === accepts;

    const searchCondition =
      fullMatch(doctor.name, search) ||
      partialMatch([doctor.provider ?? ''], search);

    const doctorLatLng = getDoctorLatLng(doctor);

    return (
      boundsIntersect(bounds, doctorLatLng) &&
      acceptsCondition &&
      searchCondition
    );
  };
