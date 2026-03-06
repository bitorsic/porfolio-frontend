import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import EndpointGrid from './components/EndpointGrid'
import JsonViewer from './components/JsonViewer'
import RequestInfo from './components/RequestInfo'
import constants from './constants'

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
}

const TIMEOUT_MS = 5000

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fetch(url, { signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

function App() {
  const [basePath, setBasePath] = useState('')
  const [endpoints, setEndpoints] = useState<Endpoint[]>([])
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [jsonData, setJsonData] = useState<object | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [method, setMethod] = useState('GET')
  const [endpoint, setEndpoint] = useState('/')
  const [status, setStatus] = useState<number | null>(null)
  const [responseTime, setResponseTime] = useState<number | null>(null)
  const [payloadSize, setPayloadSize] = useState<number | null>(null)

  useEffect(() => {
    const fetchRoot = async () => {
      try {
        const start = performance.now()
        const res = await fetchWithTimeout(constants.BASE_URL + '/')
        const elapsed = Math.round(performance.now() - start)
        const data = await res.json()
        const raw = JSON.stringify(data)

        setBasePath(data.basePath ?? '')
        setEndpoints(data.endpoints ?? [])
        setJsonData(data)
        setError(null)
        setMethod('GET')
        setSelectedPath(null)
        setEndpoint(constants.BASE_URL + '/')
        setStatus(res.status)
        setResponseTime(elapsed)
        setPayloadSize(raw.length)
      } catch (err) {
        const message = err instanceof Error && err.name === 'AbortError'
          ? `Request timed out after ${TIMEOUT_MS / 1000}s`
          : 'Could not reach the backend'
        setError(message)
      }
    }
    fetchRoot()
  }, [])

  const handleSelect = async (fullPath: string, selectedMethod: string) => {
    try {
      const url = constants.BASE_URL + fullPath
      const start = performance.now()
      const res = await fetchWithTimeout(url)
      const elapsed = Math.round(performance.now() - start)
      const data = await res.json()
      const raw = JSON.stringify(data)

      setJsonData(data)
      setError(null)
      setMethod(selectedMethod)
      setSelectedPath(fullPath)
      setEndpoint(constants.BASE_URL + fullPath)
      setStatus(res.status)
      setResponseTime(elapsed)
      setPayloadSize(raw.length)
    } catch (err) {
      const message = err instanceof Error && err.name === 'AbortError'
        ? `Request timed out after ${TIMEOUT_MS / 1000}s`
        : 'Could not reach the backend'
      setError(message)
      setJsonData(null)
      setStatus(null)
      setResponseTime(null)
      setPayloadSize(null)
    }
  }

  return (
    <div className="h-screen bg-[#1e1e1e] text-white flex flex-col overflow-hidden">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex flex-col gap-6 px-4 py-6 flex-1 overflow-hidden">
        <EndpointGrid basePath={basePath} endpoints={endpoints} selectedPath={selectedPath} onSelect={handleSelect} />
        <RequestInfo
          method={method}
          endpoint={endpoint}
          status={status}
          responseTime={responseTime}
          payloadSize={payloadSize}
        />
        {jsonData
          ? <JsonViewer data={jsonData} />
          : <div className="rounded-lg border border-white/10 flex flex-1 items-center justify-center text-sm min-h-0">
              {error
                ? <span className="text-red-400">{error}</span>
                : <span className="text-white/30">loading...</span>
              }
            </div>
        }
      </main>
    </div>
  )
}

export default App
