"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function WebhookTestPage() {
  const [webhookInfo, setWebhookInfo] = useState<any>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchWebhookInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-webhook');
      const data = await response.json();
      setWebhookInfo(data);
    } catch (error) {
      console.error('Error fetching webhook info:', error);
    } finally {
      setLoading(false);
    }
  };

  const testWebhook = async () => {
    setLoading(true);
    try {
      const testData = {
        event_type: "order.completed",
        order_id: "test-order-123",
        status: "completed",
        email: "test@example.com",
        package_name: "Test Package",
        qr_code: "test-qr-code-base64",
      };

      const response = await fetch('/api/test-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      console.error('Error testing webhook:', error);
      setTestResult({ error: 'Test failed', details: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            eSimGo Webhook Test & Info
          </h1>

          {/* Webhook Info Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Webhook Bilgileri
            </h2>
            <button
              onClick={fetchWebhookInfo}
              disabled={loading}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Yükleniyor...' : 'Webhook Bilgilerini Getir'}
            </button>

            {webhookInfo && (
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Webhook URL:
                  </h3>
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded break-all">
                    <code className="text-sm text-blue-600 dark:text-blue-400">
                      {webhookInfo.webhookUrl}
                    </code>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(webhookInfo.webhookUrl)}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    📋 Kopyala
                  </button>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Kurulum Adımları:
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
                    <li>eSimGo dashboard'a gidin</li>
                    <li>Webhook/Callback ayarlarına gidin</li>
                    <li>Webhook URL olarak yukarıdaki URL'i kullanın</li>
                    <li>Webhook'u kaydedin</li>
                    <li>Test butonuna tıklayarak test edin</li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          {/* Test Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Webhook Test
            </h2>
            <button
              onClick={testWebhook}
              disabled={loading}
              className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Test Ediliyor...' : 'Webhook Test Et'}
            </button>

            {testResult && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Test Sonucu:
                </h3>
                <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-auto text-sm">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Vercel Logs Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Webhook Loglarını Kontrol Etme
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Vercel dashboard'a gidin: <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">vercel.com</a></li>
              <li>Projenizi seçin: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">getprimesim-site</code></li>
              <li>Sol menüden <strong>"Logs"</strong> sekmesine tıklayın</li>
              <li>Webhook isteklerini görmek için filtreleyin: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/api/esimgo/webhook</code></li>
              <li>Veya <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">ESIMGO</code> kelimesini arayın</li>
            </ol>
          </div>

          {/* Direct Webhook URL */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Doğrudan Webhook URL'i
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              eSimGo dashboard'da kullanmanız gereken URL:
            </p>
            <div className="bg-white dark:bg-gray-800 p-4 rounded border-2 border-yellow-400">
              <code className="text-sm text-gray-900 dark:text-white break-all">
                {typeof window !== 'undefined' 
                  ? `${window.location.origin}/api/esimgo/webhook`
                  : 'https://getprimesim.com/api/esimgo/webhook'
                }
              </code>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              ⚠️ Production'da: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">https://getprimesim.com/api/esimgo/webhook</code>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
