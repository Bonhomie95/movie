/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_BACKEND_URL: string;
    }
  }