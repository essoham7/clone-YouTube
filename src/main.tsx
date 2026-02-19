import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { VideoProvider } from './context/VideoContext.tsx'
import { LayoutProvider } from './context/LayoutContext.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <LayoutProvider>
        <VideoProvider>
          <App />
        </VideoProvider>
      </LayoutProvider>
    </BrowserRouter>
  // </StrictMode>,
)
