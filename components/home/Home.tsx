import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Home = ({ children }: LayoutProps): JSX.Element => {
  return <div>{children}</div>;
};

export default Home;
