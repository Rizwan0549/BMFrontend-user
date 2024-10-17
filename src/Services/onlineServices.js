import { http } from "./index";
import { SERVER_URL } from "../Constant/env";
export const getOnlineClasses = () => {
  return http.get(`${SERVER_URL}api/getOnlineClasses`);
};
