import Navbar from "../components/Navbar";
import Product from "../components/Product";
import Cart from "../components/Cart";
import Lightbox from "../components/Lightbox";
import Footer from "../components/Footer";

function App() {
  return (
    <div>
      <header>
        <Navbar />
        <Cart />
      </header>
      <main>
        <Product />
        <Lightbox />
        <Footer />
      </main>
    </div>
  );
}

export default App;
