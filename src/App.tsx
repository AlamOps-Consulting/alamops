import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import "./styles.css";
import News from "./components/News";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <News />
        <Services />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;
