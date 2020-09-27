---
title: "More robust HTTP calls with Apache HttpRequestRetryHandler using RetryHandler and ServiceNotAvailableStrategy"
date: "2020-09-27"
---

# More robust HTTP calls with Apache HttpClient using HttpRequestRetryHandler and ServiceNotAvailableStrategy

When using HTTP calls you eventually run into possible issues:

* Connect Timeouts
* Socket Timeouts
* SSL handshake errors
* Connection interruptions
* Service unavailability
* Gateway Timeouts
* Bad Gateways
* ...

In most of these cases, a simple retry will help.
To retry calls on errors, we can make use of the built-in `HttpRequestRetryHandler` and the 
`ServiceUnavailableRetryStrategy`.

Let's set up a simple closeable HTTP client first:

```kotlin
val requestConfig = RequestConfig.custom()
    .setCookieSpec(CookieSpecs.STANDARD)
    .setConnectTimeout(5 * 1000)
    .setSocketTimeout(60 * 1000)
    .build()

val httpClient = HttpClientBuilder
    .create()
    .setDefaultRequestConfig(requestConfig)
    .build()
```

## HTTP Request Retry Handler

Most of the issues listed above will cause an IOException.

Any timeout or SSL negotiation issues will cause an exception that is inherited by the IOException class.

To retry your calls when an IOException occurs, we can set a `HttpRequestRetryHandler`.

```kotlin
 val retryHandler = HttpRequestRetryHandler { exception, executionCount, context ->
    // 3 retries at max
    if (executionCount > 3) {
        return@HttpRequestRetryHandler false
    } else {
        // wait a second before retrying again
        Thread.sleep(1000)
        return@HttpRequestRetryHandler true
    }
}
```

You can customize that behavior.

To use your custom retry handler, simply specify it when building your HTTP client.

```kotlin
HttpClientBuilder
    .create()
    .setRetryHandler(retryHandler)
    .build()
```

## Service Unavailable Retry Strategy

The `HttpRequestRetryHandler` will only be used when an IOException occurs.
When the SSL handshake succeeds and no socket/connect timeout occurs we might still get a HTTP response with status codes such as 502 (Bad Gateway) or 503 (Gateway Timeout).

To retry in those cases aswell, we can make use of the ServiceUnavailableRetryStrategy

```kotlin
val serviceUnavailableRetryStrategy: ServiceUnavailableRetryStrategy = object : ServiceUnavailableRetryStrategy {
    override fun getRetryInterval(): Long {
        // milliseconds
        return 1000
    }

    override fun retryRequest(response: HttpResponse?, executionCount: Int, context: HttpContext?): Boolean {
        val statusCode = response!!.statusLine.statusCode

        // retry if status code is 502 or 503 and no more than three retries were done yet
        return statusCode in listOf(502, 503) && executionCount < 3
    }

}
```

You can customize the retry behavior to your demand.

As with the HTTP request retry handler, simply specify the strategy when building your HTTP client.

```kotlin
HttpClientBuilder
    .create()
    .setServiceUnavailableRetryStrategy(serviceUnavailableRetryStrategy)
    .build()
```

When using both, the HTTP request retry handler and the service unavailable retry strategy, you will have a lot more robust HTTP client as small network/service hickups will not lead to failure.