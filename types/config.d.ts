declare global {
  type BuildMode = 'production' | 'development';
  interface IWebpackEnv {
    port?: number;
    mode?: BuildMode;
  }
}

export {};
