import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import InvestmentFund from './pages/InvestmentFund';
import Transactions from './pages/Transactions';

function App() {
  return (
    <Provider store={store}>
      <Container className="mt-4">
        <Tabs defaultActiveKey="transactions">
          <Tab eventKey="transactions" title="Transações">
            <Transactions />
          </Tab>
          <Tab eventKey="investmentFunds" title="Fundos de Investimento">
            <InvestmentFund />
          </Tab>
        </Tabs>
      </Container>
    </Provider>
  );
}

export default App;
