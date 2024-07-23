/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOST_API: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
