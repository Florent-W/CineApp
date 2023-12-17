export const transformObjectToQueryParams = (
  selection: Record<string, any>
) => {
  const selectionEntries = Object.entries(selection);
  const urlParams = selectionEntries?.map(([k, v]) => `${k}=${v}`).join('&');
  return urlParams;
};
