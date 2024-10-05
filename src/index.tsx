import { RecoilRoot } from 'recoil';

import CustomRouterProvider from './components/CustomRouterProvider';
import ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ChakraProvider>
    <RecoilRoot>
      <CustomRouterProvider />
    </RecoilRoot>
  </ChakraProvider>,
);
