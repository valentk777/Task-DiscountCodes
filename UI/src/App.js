import { Col, Row, Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { DiscountCodeGenerator } from './components/discountCodeGenerator'
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';


function App() {
  const [connection, setConnection] = useState(null)

  const generateDiscountCode = async () => {
    try {
      // initiate a connection
      const connection = HubConnectionBuilder()
        .WithUrl("https://localhost:11111")
        .configureLogging(LogLevel.Information)
        .build();

      // set up handler
      connection.on("ReceiveGenerateDiscountCodeResult", (username, msg) => {
        console.log("msg: ", msg);
      })

      await connection.start();
      await connection.invoke("GenerateDiscountCode",)

      setConnection(connection);

    } catch (exception) {
      console.error(exception);
    }
  }

  const useDiscountCode = async () => {
    try {
      // initiate a connection
      const connection = HubConnectionBuilder()
        .WithUrl("https://localhost:11111")
        .configureLogging(LogLevel.Information)
        .build();

      // set up handler
      connection.on("ReceiveGenerateDiscountCodeResult", (username, msg) => {
        console.log("msg: ", msg);
      })

      await connection.start();
      await connection.invoke("GenerateDiscountCode",)

      setConnection(connection);

    } catch (exception) {
      console.error(exception);
    }
  }

  return (
    <div>
      <main>
        <Container>
          <Row class='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight-light'>
                Welcome
              </h1>
            </Col>
          </Row>
          {/* <DiscountCodeGenerator/> */}
          <DicountUsage useDiscountCode={ }
    </Container>
      </main>
    </div>






    // <div className="App">
    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header> */}
    // </div>
  );
}

export default App;
