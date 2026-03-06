import Navbar from './components/Navbar'
import EndpointGrid from './components/EndpointGrid'
import JsonViewer from './components/JsonViewer'
import RequestInfo from './components/RequestInfo'
import constants from './constants'

function App() {
  // TODO: replace with useState + useEffect fetch from backend
  const data = constants.initialData;

  return (
    <div className="h-screen bg-[#1e1e1e] text-white flex flex-col overflow-hidden">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex flex-col gap-6 px-4 py-6 flex-1 overflow-hidden">
        <EndpointGrid onSelect={(ep) => console.log('selected', ep)} />
        <RequestInfo
          method="GET"
          endpoint="api.bitorsic.com/about"
          status={200}
          responseTime={42}
          payloadSize={JSON.stringify(data).length}
        />
        <JsonViewer data={data} />
      </main>
    </div>
  )
}

export default App
