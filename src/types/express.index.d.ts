import "express";

declare module "express-serve-static-core" {
  interface Request {
    t: (key: string, options?: any) => string;
  }
}
export function handle(i18next: i18n): any {
  throw new Error("Function not implemented.");
}
