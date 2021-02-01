export const getSearch = (search: string, queryString: string): string => {
  const queries = search
    .replace('?', '')
    .split('&')
    .map((query) => query.split('='));

  const result = queries.find(([key]) => key === queryString)?.[1] ?? '';

  return result;
};
