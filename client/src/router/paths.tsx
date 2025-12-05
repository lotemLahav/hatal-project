import { LogIn } from "../views/logIn";
import { SignUp } from "../views/signUp";
import Layout from "../views/Layout";
import { Home } from "../views/Home";
import { Checkout } from "../views/Checkout";
import { PersonalPage } from "../views/PersonalPage";

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
  }, {
    path: "/Home",
    element: <Home />,
    name: "home",
    isShown: true,
  },
  {
    path: "/signUp",
    element: <SignUp />,
    name: "signUp",
    isShown: true,
  },
  {
    path: "/checkout",
    element: <Checkout />,
    name: "checkout",
    isShown: true,
  },
    {
    path: "/profile",
    element: <PersonalPage />,
    name: "personal",
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
