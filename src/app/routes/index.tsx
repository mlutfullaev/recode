import {Route, Routes} from "react-router";
import Index from "../../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
    </Routes>
  )
}

export default AppRoutes
