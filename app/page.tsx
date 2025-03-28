"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Globe, Server, Cpu, ChevronDown, Moon, Sun } from "lucide-react"

export default function ProxyChecker() {
  const [ipPort, setIpPort] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check user preference for dark mode
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const checkProxy = async () => {
    if (!ipPort || !ipPort.includes(":")) {
      setError("Please enter a valid IP:PORT combination")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)
    setShowDetails(false)

    try {
      // Use the API endpoint directly
      const response = await fetch(`/api/${ipPort}`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(`Failed to check proxy: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <div className="max-w-4xl mx-auto p-6">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Server className="h-8 w-8 text-blue-500 dark:text-blue-400 mr-3" />
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                ProxyTech Checker
              </h1>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700" />}
            </button>
          </header>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 transition-colors">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">Check Proxy Status</h2>

              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Enter IP:PORT (e.g. 64.49.14.41:8443)"
                  value={ipPort}
                  onChange={(e) => setIpPort(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                />
                <button
                  onClick={checkProxy}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed md:w-auto w-full"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Scanning...
                    </span>
                  ) : (
                    "Check Proxy"
                  )}
                </button>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg font-mono">
                <p>
                  API Usage: <span className="text-blue-600 dark:text-blue-400">/api/IP:PORT</span>
                </p>
                <p>
                  Example: <span className="text-blue-600 dark:text-blue-400">/api/64.49.14.41:8443</span>
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl mb-8 flex items-start">
              <XCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {result && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold dark:text-white">Proxy Analysis Results</h2>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${result.proxyip ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}
                  >
                    {result.proxyip ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Working
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 mr-1" />
                        Not Working
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Server className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                      <h3 className="font-medium dark:text-white">Proxy Information</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">IP Address:</span>
                        <span className="font-mono dark:text-white">{result.proxy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Port:</span>
                        <span className="font-mono dark:text-white">{result.port}</span>
                      </div>
                      {result.asn && (
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">ASN:</span>
                          <span className="font-mono dark:text-white">{result.asn}</span>
                        </div>
                      )}
                      {result.org && (
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Organization:</span>
                          <span className="dark:text-white">{result.org}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Globe className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                      <h3 className="font-medium dark:text-white">Location Data</h3>
                    </div>
                    <div className="space-y-2">
                      {result.country && (
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Country:</span>
                          <span className="dark:text-white">
                            {result.flag} {result.country}
                          </span>
                        </div>
                      )}
                      {result.city && (
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">City:</span>
                          <span className="dark:text-white">{result.city}</span>
                        </div>
                      )}
                      {result.timezone && (
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Timezone:</span>
                          <span className="dark:text-white">{result.timezone}</span>
                        </div>
                      )}
                      {result.latency && (
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Latency:</span>
                          <span
                            className={`font-mono dark:text-white ${
                              Number.parseInt(result.latency) < 300
                                ? "text-green-600 dark:text-green-400"
                                : Number.parseInt(result.latency) < 600
                                  ? "text-yellow-600 dark:text-yellow-400"
                                  : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {result.latency}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-full flex items-center justify-center py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors"
                >
                  {showDetails ? "Hide" : "Show"} Raw Data
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`} />
                </button>

                {showDetails && (
                  <div className="mt-4">
                    <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-xs overflow-auto max-h-60 font-mono text-gray-800 dark:text-gray-300">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start">
              <Cpu className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">About ProxyTech Checker</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  This tool checks proxy servers by connecting to the proxyip.biz.id API. Use it to verify if a proxy is
                  operational and to get detailed information about its location, organization, and performance metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

