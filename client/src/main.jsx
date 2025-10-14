import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd';
import App from './App.jsx'
import "antd/dist/reset.css";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#F65F42',
          colorLink: '#F65F42',
        }
      }}>
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
)
