import ReduxProvider from "./ReduxProvider.tsx";

type AppProvidersProps = {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  )
}

export default AppProviders
