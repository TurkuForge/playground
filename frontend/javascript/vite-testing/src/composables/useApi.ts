// useApi.ts
interface UserData {
  age: number;
  name: string;
}

const API_RESPONSE_DELAY = 1000; // ms

export const useApi = async () => {
  const userData: UserData = await new Promise((resolve) => {
    const response = { age: 30, name: "John Doe" };
    setTimeout(() => resolve(response), API_RESPONSE_DELAY);
  });

  return {
    userData,
  };
};
