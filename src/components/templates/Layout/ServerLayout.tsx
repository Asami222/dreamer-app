// components/templates/layout/ServerLayout.tsx
import HeaderWrapper from "./HeaderWrapper";
import { Container } from "./Container";
//import Header from "@/components/organisms/Header";

const ServerLayout = async ({
  children,
  top,
}: {
  children: React.ReactNode;
  top?: boolean;
}) => {
 
  return (
    <div className="w-full min-h-dvh overflow-x-hidden mx-auto">
      {!top && <HeaderWrapper />}
      <Container>
        <main>{children}</main>
      </Container>
    </div>
  );
};

export default ServerLayout;