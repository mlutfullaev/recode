import {BrowserRouter} from "react-router";
import AppProviders from "@/app/providers/AppProviders.tsx";
import AppRoutes from "@/app/routes";
import '@/app/styles/globals.scss'

const App = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  )
}

export default App
