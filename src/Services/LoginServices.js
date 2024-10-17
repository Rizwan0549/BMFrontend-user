import { http } from "../../services";

export const getLastAuctionDetails = () => {
  return http.get("/api/getLastAuctionDetails");
};

export const getLastRefreshTime = () => {
  return http.get("/api/LastRefreshTime");
};

export const insertBid = (data) => {
  return http.post("/api/AuctionBid/Insert", data);
};

export const getAuctionSearch = (wallet) => {
  return http.get(`/api/getAuctionSearch/${wallet}`);
};

export const getAuctionPage = (paginationEndpoint) => {
  return http.get(`/api/getAuctionPage/${paginationEndpoint}`);
};

export const getUserInfo = () => {
  return http.get("/api/users/getuserdetails");
};

export const getUserUpdatedStat = () => {
  return http.get("/api/users/getUserUpdatedStat");
};
