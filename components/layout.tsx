import { ReactNode } from "react";
import Header from "./Header";

type ILayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Header />
      <main className="h-full">{children}</main>
    </>
  );
};

export default Layout;
