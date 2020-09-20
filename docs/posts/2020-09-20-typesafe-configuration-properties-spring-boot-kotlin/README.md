---
title: "Type-safe configuration properties and autocomplete in Spring Boot + Kotlin"
date: "2020-09-20"
---

# Type-safe configuration properties and autocomplete in Spring Boot + Kotlin

Spring Boot allows configuring properties for multiple environments using application properties or yml files.

A sample configuration file could look like this:

```yml
my.ftp:
    hostname: foo.bar
    username: bambino
    password: topsecret
    port: 22
```

You may have multiple files like application-default.yml, application-dev.yml, application-prod.yml.
The only thing you need to do is set your active profile (i.e. "prod") and Spring will automatically use that profile.
This can be done by setting SPRING_PROFILES_ACTIVE environment variable.
You can also define default properties in your application.yml (no profile suffix).

## Disadvantages of using `@Value`

To access the values depending on your environment, you may inject them using `@Value`.

```kotlin
class MyService(
    @Value("\${my.ftp.hostname}")
    private val hostname: String,
    @Value("\${my.ftp.port}")
    private val port: Int,
    @Value("\${my.ftp.username}")
    private val username: String,
    @Value("\${my.ftp.password}")
    private val password: String
) {

    // ...
}
```

Using `@Value` comes with a few disadvantages:

* Usage of magic strings
* No reusability (needs to be repeated in another service again)
* The prefix needs to be repeated (my.ftp), so changing the prefix requires changing every occurence
* Escaping with `\$` necessary (only in Kotlin) 
* No auto complete in IntelliJ IDEA by default

## Using Kotlin data classes 

A better alternative to using `@Value` directly is provided by the `@ConfigurationProperties` annotation.
In combination with the `@ConstructorBinding` annotation, we can even make use of Kotlin's data classes.

```kotlin
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConfigurationProperties("my.ftp")
@ConstructorBinding
data class MyFtpConfig {
    val hostname: String,
    val port: Int,
    val username: String,
    val password: String
}
```

This comes with a few advantages:

* Immutability out-of-the-box
* Prefix (my.ftp) is only defined once
* Easy reusability
* No need to define the properties configuration name as the data class property name will be mapped automatically (Spring supports CamelCase, SnakeCase, ...)

Please note that you have to define all your `@ConfigurationProperties` classes in your main application class (entry point of your Spring Boot app).

```kotlin
@SpringBootApplication
@EnableConfigurationProperties(MyFtpConfig::class)
class MyApplication {

}
```

Alternatively, you can use `@ConfigurationPropertiesScan`.

## Auto complete in IntelliJ

To get autocompletion in your application files in IntelliJ IDEA, you have to use [KAPT - Kotlin Annotation Processing](https://kotlinlang.org/docs/reference/kapt.html).


```groovy
apply plugin: 'kotlin-kapt'

dependencies {
    // ...
    kapt "org.springframework.boot:spring-boot-configuration-processor:$springBootVersion"
}
```

Make sure to rebuild your project after adding the plugin.
KAPT will process the annotations and generate metadata based on your configuration properties.
IntelliJ uses that metadata to enable autocompletion.

## Value Validation

Spring supports validating configuration properties using [JSR-303 - Bean Validation Spec](https://beanvalidation.org/1.0/spec/).
If the validation fails, the application will not start and you'll get an error message.
This way you can avoid common misconfiguration and make sure your app doesn't get runtime errors when executing actual business logic.


```kotlin
@Min(1025)
@Max(65536)
private val port: Int
```