import { ReactNode } from "react";

export interface IProtectedRouteProps {
  children: ReactNode;
  available: boolean;
  redirectPath?: string;
}

export interface IRouterProps {
  isAuthorized: boolean;
}
