import { LogIn } from "../views/logIn";
import { SignUp } from "../views/signUp";
import Layout from "../views/Layout";

export interface Page {
  path: string;
  element: JSX.Element;
  name: string;
  isShown: boolean;
}

export const routes: Page[] = [
  {
    path: "/",
    element: <LogIn />,
    name: "login",
    isShown: true,
  },
  {
    path: "/signUp",
    element: <SignUp />,
    name: "signUp",
    isShown: true,
  },
];

export const paths = [
  {
    path: "/",
    element: <Layout />,
    children: routes.map((route) => ({
      path: route.path,
      element: route.element,
    })),
  },
];
