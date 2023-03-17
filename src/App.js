import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { User } from "./pages/user";
import { SignIn } from "./pages/sign-in";
import { NotFind } from "./pages/NotFind.js";
import { Index } from "./pages";
import { Header } from "./companants/header";
import { Footer } from "./companants/footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/User" element={<User />} />
        <Route path="/*" element={<NotFind />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
