---
title: "Mocking Spring TransactionTemplate with Kotlin and Mockito"
date: "2019-10-04"
---

# Mocking Spring TransactionTemplate with Kotlin and Mockito

Besides the `@Transactional` anontation, you can also use Springs [TransactionTemplate](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/transaction/support/TransactionTemplate.html) programmatically.

```kotlin
import org.springframework.transaction.support.TransactionTemplate

class FooService constructor(
    private val transactionTemplate: TransactionTemplate
) {

    fun save() {
        transactionTemplate.execute {
            // important transactional code
        }

        // other code
    }

}
```

When writing a Unit-Test for this class, you probably still want to test the code that is being executed within the transaction template.
To do this, you can simply mock the transaction templates method to execute whatever is inside the block.

```kotlin
whenever(transactionTemplate.execute(any<TransactionCallback<Unit>>())).thenAnswer {
    (it.arguments[0] as TransactionCallback<*>).doInTransaction(mock())
}
```

The code above uses [Mockito Kotlin](https://github.com/nhaarman/mockito-kotlin).

An easy way to execute any call inside the `execute` block is setup a `@BeforeEach` function from JUnit that will get called before each test execution.

```kotlin
import com.nhaarman.mockitokotlin2.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class FooServiceTest {

    private val transactionTemplate: TransactionTemplate = mock()

    private val fooService = FooService(
        transactionTemplate = transactionTemplate,
    )

    @BeforeEach
    fun setUp() {
        whenever(transactionTemplate.execute(any<TransactionCallback<Unit>>())).thenAnswer {
            (it.arguments[0] as TransactionCallback<*>).doInTransaction(mock())
        }
    }

    @Test
    fun `should do something`() {
        // your test code
    }

}
```