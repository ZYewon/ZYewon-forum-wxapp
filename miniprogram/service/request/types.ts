export interface interceptors {
  requestInterceptors?: (config: requestConfig) => requestConfig;
  responseInterceptors?: (res: any) => any;
}
export interface requestConfig {
  baseUrl?: string;
  url?: string;
  data?: string | object | ArrayBuffer;
  method?:
    | "OPTIONS"
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "TRACE"
    | "HEAD"
    | "CONNECT";
  header?: object;
  timeout?: number;
  dataType?: "json" | "其他";
  responseType?: string;
  interceptors?: interceptors;
}
