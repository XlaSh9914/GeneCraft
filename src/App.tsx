import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import SignInPage from "@/pages/signin";
import SignUpPage from "@/pages/signup";
import CoursePage from "@/pages/course";
import EvaluationTestPage from "./pages/test";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/home" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<SignInPage />} path="/signIn" />
      <Route element={<SignUpPage />} path="/signUp" />
      <Route element={<CoursePage />} path="/course" />
      <Route element={<EvaluationTestPage />} path="/test" />
    </Routes>
  );
}

export default App;
