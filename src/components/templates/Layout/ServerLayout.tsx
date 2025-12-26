// components/templates/layout/ServerLayout.tsx
import Header from "src/components/organisms/Header";
import { Container } from "./Container";

const ServerLayout = async ({
  children,
  top,
}: {
  children: React.ReactNode;
  top?: boolean;
}) => {
 
  return (
    <div className="w-full min-h-dvh overflow-x-hidden mx-auto">
      {!top && <Header/>}
      <Container>
        <main>{children}</main>
      </Container>
    </div>
  );
};

export default ServerLayout;