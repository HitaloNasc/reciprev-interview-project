import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import { Tab } from 'semantic-ui-react';
import Page from './commons/Page';
import PageContent from './commons/PageContent';
import InvestmentFund from './pages/InvestmentFund';
import Transactions from './pages/Transactions';

function App() {
  const panes = [
    // {
    //   menuItem: 'DASHBOARD',
    //   render: () => (
    //     <>
    //       <PageContent isSolid={false}>
    //         <h1>GRÁFICOS</h1>
    //       </PageContent>
    //     </>
    //   ),
    // },
    {
      menuItem: 'TRANSAÇÕES',
      render: () => <Transactions />,
    },
    {
      menuItem: 'FUNDOS DE INVESTIMENTO',
      render: () => <InvestmentFund />,
    },
  ];

  return (
    <Provider store={store}>
      <Page>
        <PageContent isSolid={false}>
          <Tab
            menu={{
              pointing: false,
            }}
            panes={panes}
          />
        </PageContent>
      </Page>
    </Provider>
  );
}

export default App;
