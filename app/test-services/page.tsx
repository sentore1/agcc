'use client';

import { useEffect, useState } from 'react';

export default function TestServicesPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testAPI();
  }, []);

  const testAPI = async () => {
    try {
      console.log('Testing API...');
      console.log('Fetching from:', '/api/service-types');
      
      const response = await fetch('/api/service-types', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store' // Disable caching
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await response.json();
      console.log('Response data:', data);
      
      setResult(data);
      setLoading(false);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Service Types API Test</h1>
        
        <div className="mb-4">
          <button
            onClick={testAPI}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload API Test
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">API Response:</h2>
              <div className="bg-gray-100 p-4 rounded overflow-auto">
                <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Summary:</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 p-4 rounded">
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="text-2xl font-bold">
                    {result.error ? '❌ Error' : '✓ Success'}
                  </div>
                </div>
                <div className="bg-green-100 p-4 rounded">
                  <div className="text-sm text-gray-600">Service Types Found</div>
                  <div className="text-2xl font-bold">
                    {result.data ? result.data.length : 0}
                  </div>
                </div>
              </div>
            </div>

            {result.data && result.data.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-2">Service Types List:</h2>
                <div className="space-y-2">
                  {result.data.map((service: any) => (
                    <div key={service.id} className="border p-4 rounded">
                      <div className="font-bold">{service.name}</div>
                      <div className="text-sm text-gray-600">{service.description}</div>
                      <div className="text-xs text-gray-500 mt-2">
                        Icon: {service.icon} | ID: {service.id}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded">
                <h2 className="text-xl font-bold text-red-700 mb-2">Error Details:</h2>
                <p className="text-red-600">{result.error}</p>
              </div>
            )}

            {result.data && result.data.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                <h2 className="text-xl font-bold text-yellow-700 mb-2">⚠️ No Service Types Found</h2>
                <p className="text-yellow-700 mb-4">
                  The database has no service types. You need to run the SQL script.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-800">
                  <li>Open Supabase SQL Editor</li>
                  <li>Run the script: <code className="bg-yellow-100 px-2 py-1 rounded">scripts/insert-initial-service-types.sql</code></li>
                  <li>Refresh this page</li>
                </ol>
              </div>
            )}
          </>
        )}

        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-2">Environment Check:</h2>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">Supabase URL:</span>{' '}
              <code className="bg-gray-100 px-2 py-1 rounded">
                {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '❌ Not Set'}
              </code>
            </div>
            <div>
              <span className="font-semibold">Supabase Key:</span>{' '}
              <code className="bg-gray-100 px-2 py-1 rounded">
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '❌ Not Set'}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
