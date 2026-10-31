declare module "next" {
  export interface RedirectRoute {
    source: string;
    destination: string;
    permanent: boolean;
  }

  export interface NextConfig {
    redirects?: () => Promise<RedirectRoute[]>;
    [key: string]: unknown;
  }
}
