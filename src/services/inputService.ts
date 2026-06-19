import { apiBaseUrl } from "./config";

export type MapperInput = {
  date: string;
  input: string;
};

type InputDataResponse = {
  items: MapperInput[];
};

export const getInputData = async (): Promise<MapperInput[]> => {
  const response = await fetch(`${apiBaseUrl}/inputs`);

  if (!response.ok) {
    throw new Error("Unable to fetch input data");
  }

  const data = (await response.json()) as InputDataResponse;
  return data.items;
};

export const appendInputData = async (data: MapperInput): Promise<MapperInput[]> => {
  const response = await fetch(`${apiBaseUrl}/inputs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Unable to save input data");
  }

  const responseData = (await response.json()) as InputDataResponse;
  return responseData.items;
};
