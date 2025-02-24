import { Suspense, lazy } from 'react'
import './App.css'
import { StyledEngineProvider } from '@mui/material/styles'

const NewsAggregatorPageLazy = lazy(() => import('./views/NewsAggregatorPage'))

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <StyledEngineProvider injectFirst>
          <NewsAggregatorPageLazy />
        </StyledEngineProvider>
      </Suspense>
    </>
  )
}

export default App
