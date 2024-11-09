import React, { useEffect, useState } from 'react';
import { testApiEndpoints } from '../utils/testApi';
import { Card } from './ui/Card';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface TestResult {
  success: boolean;
  ping?: any;
  protected?: any;
  error?: string;
}

export default function ApiTest() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runTest = async () => {
      try {
        const result = await testApiEndpoints();
        setTestResult(result);
      } catch (error) {
        setTestResult({ success: false, error: 'Failed to connect to API' });
      } finally {
        setLoading(false);
      }
    };

    runTest();
  }, []);

  if (loading) {
    return (
      <Card className="p-4 flex items-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
        <span>Testing API connection...</span>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-2">
        {testResult?.success ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500" />
        )}
        <h3 className="font-semibold">
          API Connection {testResult?.success ? 'Successful' : 'Failed'}
        </h3>
      </div>
      
      {testResult?.success ? (
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Ping Response:</span>
            <pre className="mt-1 bg-gray-50 p-2 rounded-md">
              {JSON.stringify(testResult.ping, null, 2)}
            </pre>
          </div>
          {testResult.protected && (
            <div>
              <span className="font-medium">Protected Endpoint:</span>
              <pre className="mt-1 bg-gray-50 p-2 rounded-md">
                {JSON.stringify(testResult.protected, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <p className="text-red-600 text-sm">{testResult?.error}</p>
      )}
    </Card>
  );
}