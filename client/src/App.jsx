import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import './global.css'
import './global.scss'
import LandingPage from "./pages/landingpage/LandingPage";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Create from "./pages/Create";
import Sale from "./pages/Sale";


import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { walletConnect } from "./utils/constants";


function App() {
  if (localStorage.getItem('theme')) {
    document.body.className = localStorage.getItem('theme')
  } else {
    localStorage.setItem('theme', 'dark')
    document.body.className = localStorage.getItem('theme')
  }

  const chains = [arbitrum, mainnet, polygon]
  const projectId = `${walletConnect}`

  const { provider } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider
  })
  const ethereumClient = new EthereumClient(wagmiClient, chains)

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Routes>
          <Fragment>
            <Route
              path="/"
              element={<LandingPage />}
            />
            <Route
              path="/create"
              element={<Create />}
            />
            <Route
              path="/sale"
              element={<Sale />}
            />
          </Fragment>
        </Routes>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

export default App
