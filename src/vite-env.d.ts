/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Meta Pixel id. Unset means all tracking is a no-op — see src/lib/analytics.ts */
  readonly VITE_META_PIXEL_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
