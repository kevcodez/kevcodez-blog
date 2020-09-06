---
title: "Retry sending metrics to Micrometer in Spring Boot on failure"
date: "2019-09-06"
---

# Retry sending metrics to Micrometer in Spring Boot on failure

[Micrometer](https://micrometer.io/) allows you to instrument your JVM-based application to submit metrics.

Micrometer only collects the metrics and then submits it to a registry. Many differrent registries are supported, such as Elasticsearch or Prometheus.
When metrics are submitted via HTTP, no known HTTP client library like apache-httpclient or okhttp is used, but rather a simple `HttpUrlConnectionSender`-Interface.
Thus, to retry on network transmission failure, the retry logic has to be implemented by yourself.

You may use libraries such as [resilience4j](https://github.com/resilience4j/resilience4j).

```kotlin
private class RetryHttpClient : HttpUrlConnectionSender() {

    private val retryConfig = RetryConfig.custom<RetryConfig>() 
        .maxAttempts(3)
        .waitDuration(Duration.ofSeconds(5))
        .build()

    private val retry: Retry = Retry.of("elasticsearch-metrics", retryConfig)

    override fun send(request: HttpSender.Request): HttpSender.Response {
        val retryableSupplier = Retry.decorateCheckedSupplier(retry) { super.send(request) }
        return Try.of(retryableSupplier).get()
    }
}
```

Using this RetryHttpClient, the submission of metrics is retried up to three times. On each failure, the client waits 5 seconds before trying again.

To use the custom RetryHttpClient in your Spring Boot application, you need to overwrite the `ElasticMeterRegistry` that is provided by micrometer by default.

```kotlin
@Bean
@ConditionalOnProperty(prefix = "management.metrics.export.elastic", name = ["enabled"], havingValue = "true", matchIfMissing = true) 
fun elasticMeterRegistry(elasticConfig: ElasticConfig): ElasticMeterRegistry { 
    return ElasticMeterRegistry.builder(elasticConfig)
        .clock(Clock.SYSTEM)
        .httpClient(RetryHttpClient())
        .build()
}
```

The `ConditionalOnProperty` prevents the bean being initialised in an environment, where micrometer is not supported, i.e. when running unit tests.

The `ElasticConfig` class is provided by micrometer.