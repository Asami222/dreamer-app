// components/templates/layout/Container.tsx
import { roboto, m_plus_1p } from "src/app/layout";

export const Container = ({ children }: { children: React.ReactNode }) => {
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