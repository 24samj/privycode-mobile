import axios, { InternalAxiosRequestConfig } from "axios";
import { getToken } from "./storage.util";

// Global settings
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

// Config axios instance
const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL;
const timeout = Number(process.env.EXPO_PUBLIC_API_TIMEOUT);

// Extend Axios request config to include requestId
interface CustomRequestConfig extends InternalAxiosRequestConfig {
  requestId?: string;
}

export const AxiosInstance = axios.create({
  baseURL,
  timeout,
});

// Store request timestamps to calculate response times
const requestTimestamps = new Map();

// Request interceptor
AxiosInstance.interceptors.request.use(async function (
  config: CustomRequestConfig
) {
  const token = await getToken();

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // Store the timestamp when the request is made
  const requestId = `${config.method}-${config.url}-${Date.now()}`;
  config.requestId = requestId;
  requestTimestamps.set(requestId, Date.now());

  return config;
});

// Response interceptor
AxiosInstance.interceptors.response.use(
  async (response) => {
    // Get the request timestamp and calculate response time
    const requestId = (response.config as CustomRequestConfig).requestId;
    if (requestId) {
      const startTime = requestTimestamps.get(requestId);

      if (startTime) {
        const responseTime = Date.now() - startTime;
        // Clean up the timestamp
        requestTimestamps.delete(requestId);

        // Check if response took more than 20 seconds
        if (responseTime > 20000) {
          const slowResponseMsg = `SLOW_RESPONSE ${response?.config?.method?.toUpperCase()} ${
            response?.config?.url
          } status=${response?.status} took ${responseTime}ms`;
          //   await sendToSumologic(slowResponseMsg);
          console.log(slowResponseMsg);
        }
      }
    }

    return response;
  },
  async (error) => {
    // Clean up any stored timestamp for this request
    const requestId = (error.config as CustomRequestConfig)?.requestId;
    if (requestId) {
      requestTimestamps.delete(requestId);
    }

    // Send error to Sumologic
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Unknown error occurred";

    console.warn(`Request to ${error?.config?.url} failed with error`, error);
    // await sendToSumologic(
    //   `ERROR ${error?.config?.method?.toUpperCase()} ${
    //     error?.config?.url
    //   } status=${error.response?.status || "N/A"} message=${errorMessage}`
    // );

    return Promise.reject(error);
  }
);

export default AxiosInstance;
