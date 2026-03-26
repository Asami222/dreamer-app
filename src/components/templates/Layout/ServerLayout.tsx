// components/templates/layout/ServerLayout.tsx
import HeaderWrapper from "./HeaderWrapper";
import { Container } from "./Container";
import { createClient } from "@/libs/supabase/server";

const ServerLayout = async ({
  children,
  top,
}: {
  children: React.ReactNode;
  top?: boolean;
}) => {

   const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

 
  return (
    <div className="w-full min-h-dvh overflow-x-hidden mx-auto">
      {!top && <HeaderWrapper user={user}/>}
      <Container>
        <main>{children}</main>
      </Container>
    </div>
  );
};

export default ServerLayout;