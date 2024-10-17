import axios from "axios";
var StatusCode;
(function (StatusCode) {
  StatusCode[(StatusCode["Unauthorized"] = 401)] = "Unauthorized";
  StatusCode[(StatusCode["Forbidden"] = 403)] = "Forbidden";
  StatusCode[(StatusCode["TooManyRequests"] = 429)] = "TooManyRequests";
  StatusCode[(StatusCode["InternalServerError"] = 500)] = "InternalServerError";
})(StatusCode || (StatusCode = {}));

const headers = {
  Accept: "application/json",
};
// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config) => {
  try {
    const token = localStorage.getItem("bearToken");
    if (token != null) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    throw new Error(error);
  }
};
class Http {
  instance = null;
  get http() {
    return this.instance != null ? this.instance : this.initHttp();
  }
  initHttp() {
    const http = axios.create({
      baseURL: process.env.REACT_APP_BASEURL,
      headers,
      //withCredentials: true,
    });
    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error)
    );
    http.interceptors.response.use(
      (response) => {
        return { data: response.data, status: response.status };
      },
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );
    this.instance = http;
    return http;
  }
  request(config) {
    return this.http.request(config);
  }
  get(url, config) {
    return this.http.get(url, config);
  }
  post(url, data, config) {
    return this.http.post(url, data, config);
  }
  put(url, data, config) {
    return this.http.put(url, data, config);
  }
  delete(url, config) {
    return this.http.delete(url, config);
  }
  // Handle global app errors
  // We can handle generic app errors depending on the status code
  handleError(error) {
    const { status } = error;
    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        // localStorage.clear();
        // window.location = "/";
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
      default: {
        // Handle default
        break;
      }
    }
    return Promise.reject(error);
  }
}
export const http = new Http();
