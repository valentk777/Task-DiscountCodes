import "App.css";

import Footer from "components/footer/footer";
import Header from "components/header/header";
import Home from "pages/Home";

function App() {
  return (
    <div id="background" className="background">
      <Header title={"WELCOME TO DISCOUNT CODES APP!"} />
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
