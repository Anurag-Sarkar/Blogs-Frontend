import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import BlogDetail from "../pages/BlogDetail";
import Navbar from "../Components/navbar/Navbar";

const AppRouter = () => {
  return (
    <div className=" h-screen p-2 md:p-5">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
