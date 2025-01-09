import Footer from "src/components/footer/footer";
import Header from "src/components/header/header";
import Home from "src/pages/Home";

function App() {
  return (
    <div id="background" className="background">
      {/* <Header title={"WELCOME TO DISCOUNT CODES APP!"} /> */}
      <div className="app">
        <main>
          <Home />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
