import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import './index.scss';
import Home from './pages/Home';

// For Web3React Context
const getLibrary = (provider: any) => {
  return new Web3Provider(provider);
};

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div id='App'>
        <Home />
      </div>
    </Web3ReactProvider>
  );
};
export default App;
