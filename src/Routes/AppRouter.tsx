import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import BlogDetail from "../pages/BlogDetail";
import Navbar from "../Components/navbar/Navbar";
import Footer from "../Components/footer/Footer";

const AppRouter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default AppRouter;
