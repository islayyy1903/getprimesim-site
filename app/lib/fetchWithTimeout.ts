/**
 * Fetch wrapper with timeout and retry support
 * Handles network errors, timeouts, and provides retry logic
 */

interface FetchWithTimeoutOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

/**
 * Fetch with timeout and automatic retry
 * 
 * @param url - URL to fetch
 * @param options - Fetch options including timeout, retries, and retryDelay
 * @returns Promise<Response>
 */
export async function fetchWithTimeout(
  url: string,
  options: FetchWithTimeoutOptions = {}
): Promise<Response> {
  const {
    timeout = 30000, // 30 seconds default timeout
    retries = 3, // 3 retries by default
    retryDelay = 1000, // 1 second delay between retries
    ...fetchOptions
  } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Merge abort signal with existing signal if provided
      const signal = fetchOptions.signal
        ? abortSignalAny([fetchOptions.signal, controller.signal])
        : controller.signal;

      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal,
        });

        clearTimeout(timeoutId);
        return response;
      } catch (fetchError: unknown) {
        clearTimeout(timeoutId);
        
        // If it's an abort error due to timeout
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          throw new Error(`Request timeout after ${timeout}ms`);
        }
        
        throw fetchError;
      }
    } catch (error: unknown) {
      const err = error as Error;
      lastError = err;

      // Don't retry on the last attempt
      if (attempt === retries) {
        break;
      }

      // Determine if we should retry
      const shouldRetry = shouldRetryError(err);
      
      if (!shouldRetry) {
        // Non-retryable error, throw immediately
        throw err;
      }

      // Log retry attempt
      console.warn(
        `⚠️ Fetch attempt ${attempt + 1}/${retries + 1} failed: ${err.message}. Retrying in ${retryDelay}ms...`
      );

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1))); // Exponential backoff
    }
  }

  // All retries exhausted
  if (lastError) {
    // Provide a more user-friendly error message
    const friendlyMessage = getFriendlyErrorMessage(lastError);
    throw new Error(friendlyMessage);
  }

  throw new Error('Request failed after all retries');
}

/**
 * Check if an error is retryable
 */
function shouldRetryError(error: Error): boolean {
  const message = error.message.toLowerCase();
  
  // Retry on network errors
  if (
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('timeout') ||
    message.includes('connection') ||
    message.includes('failed') ||
    message.includes('enotfound') ||
    message.includes('econnrefused') ||
    message.includes('etimedout')
  ) {
    return true;
  }

  // Don't retry on client errors (4xx) - these are usually not recoverable
  if (message.includes('400') || message.includes('401') || message.includes('403') || message.includes('404')) {
    return false;
  }

  // Retry on server errors (5xx)
  if (message.includes('500') || message.includes('502') || message.includes('503') || message.includes('504')) {
    return true;
  }

  // Default to retrying for unknown errors
  return true;
}

/**
 * Get user-friendly error message
 */
function getFriendlyErrorMessage(error: Error): string {
  const message = error.message.toLowerCase();

  if (message.includes('timeout')) {
    return 'Bağlantı zaman aşımına uğradı. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.';
  }

  if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
    return 'Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin. Sorun devam ederse VPN\'i kapatmayı deneyin.';
  }

  if (message.includes('enotfound') || message.includes('dns')) {
    return 'Sunucu bulunamadı. Lütfen internet bağlantınızı kontrol edin.';
  }

  if (message.includes('failed')) {
    return 'İstek başarısız oldu. Lütfen tekrar deneyin.';
  }

  return error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
}

/**
 * Helper to combine multiple abort signals
 */
function abortSignalAny(signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();

  signals.forEach((signal) => {
    if (signal.aborted) {
      controller.abort();
    } else {
      signal.addEventListener('abort', () => controller.abort());
    }
  });

  return controller.signal;
}





