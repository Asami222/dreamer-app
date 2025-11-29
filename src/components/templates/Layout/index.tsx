import Header from "src/components/organisms/Header";
import { roboto, m_plus_1p } from "src/app/layout";

interface LayoutProps {
  children: React.ReactNode;
  top?: boolean;
}

export const Container = ({ children }: Omit<LayoutProps, "top">) => {
  return (
    <div
      className="w-[92%] mx-auto max-w-[800px]"
      style={{
        fontFamily: `${roboto.style.fontFamily}, ${m_plus_1p.style.fontFamily}`,
      }}
    >
      {children}
    </div>
  );
};

const Layout = ({ children, top }: LayoutProps) => {
  return (
      <div className="w-full min-h-dvh overflow-x-hidden mx-auto">
        {!top && <Header />}
        <Container>
          <main>{children}</main>
        </Container>
      </div>
  );
};

export default Layout;