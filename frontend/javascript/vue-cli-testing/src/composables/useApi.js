export const useApi = async () => {
  await new Promise((r) => setTimeout(r, 1000));
  const api = { getPromo: () => [{ name: "promo1" }] };
  console.log("useApi");
  return {
    api,
  };
};
