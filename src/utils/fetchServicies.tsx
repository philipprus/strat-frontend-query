import { BASE_PATH } from "./constants";
import sendRequest from "./sendRequest";

export const getJobsApiMethod = async () => {
  const response = await sendRequest(`${BASE_PATH}/jobs/`, {
    method: "GET",
  });
  return await response.json();
};

export const createJobApiMethod = async ({
  name,
  duration,
}: {
  name: string;
  duration: number;
}) => {
  sendRequest(`${BASE_PATH}/jobs/`, {
    body: JSON.stringify({ name, duration }),
  });
};

export const deleteJobApiMethod = (name: string) =>
  sendRequest(`${BASE_PATH}/jobs/?name=${name}`, {
    method: "DELETE",
  });

export const moveJobApiMethod = async ({
  name,
  up,
}: {
  name: string;
  up: boolean;
}) => {
  return sendRequest(`${BASE_PATH}/job/move/?name=${name}&up=${up}`);

  // return { data: await response.json() };
};

export const cancelJobApiMethod = (name: string) =>
  sendRequest(`${BASE_PATH}/job/cancel/?name=${name}`);
