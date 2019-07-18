import React from 'react';
import './Resources/css/app.css';

import Layout from './components/Hoc/Layout';

const App = (props) =>  {
  return (
    <div className="App">
      <Layout >
        second line
      </Layout>
    </div>
  );
}

export default App;
 