import React, { Component, Suspense } from 'react'
import Routers from '../routes'
import ErrorBoundary from './components/ErrorBoundaries/ErrorBoundary'

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routers />
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default App;
