export const getData = async <T>(url: string): Promise<T> => {
  const responce = await fetch(url);
  return await responce.json();
};
