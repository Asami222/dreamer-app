import ServerLayout from "@/components/templates/Layout/ServerLayout";
import { ReactQueryProvider } from './providers/ReactQueryProvider'


export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServerLayout>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>
    </ServerLayout>
  )
}