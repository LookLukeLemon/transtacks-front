import { ReactNode } from "react";
import Header from "./Header";

type ILayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
