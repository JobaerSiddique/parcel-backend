export type TErrorSources = {
  path: string | number;  // Only string or number allowed
  message: string;
}[];
  export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
  };