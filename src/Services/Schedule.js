import { http } from "./index";
import { SERVER_URL } from "../Constant/env";
export const getSchedule = () => {
  return http.get(`${SERVER_URL}api/getSchedule`);
};
