import { useQuery } from "@tanstack/react-query";

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk"
    );
    if (!response.ok) throw new Error("reponse not ok");
    return response.json();
  } catch (e: any) {
    console.log(e.error);
  }
};

export const useFetchData = () => {
  return useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });
};
