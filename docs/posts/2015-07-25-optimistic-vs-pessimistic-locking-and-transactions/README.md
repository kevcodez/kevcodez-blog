---
title: "Optimistic vs Pessimistic Locking and Transactions"
date: "2015-07-25"
---

What are transactions and why do we need them? The classic, relational database systems, such as MySQL, Postgres come with **ACID** (Atomicity, Consistency, Isolation, Durability). We start a transaction, execute our database changes and commit. If a single action fails, the transaction will be rolled back and no change is applied. Only if every change succeeds, the transaction is committed and persisted. This protects us from inconsistency. This relates to a single transaction. When multiple users access the same object, we need to define a locking strategy: optimistic or pessmistic locking. When developing an application with a database (almost any application nowadays) with a high number of users, it is very likely, that some time, more than just one user tries to read or write an object. I am going to explain optimistic vs pessimistic locking in this article and explain the differences.

* * *

##  Optimistic Locking

With optimistic locking, every row in a database has its own version number. When reading the object, the version number is retrieved. When changing the object and trying to persist the change, the detached version is checked against the current version in the database. If there is no change in version, the object can be persisted without any further problems. If the version did change (dirty), the transaction is cancelled (usually, an exception is thrown). Optimistic locking is used far more often and is recommended, if you have a high load on your database without many collisions expected.  JPA supports multiple strategies for optimistic locking: version number, timestamp or a rowstate. **Reading from the database is NOT influenced at all.**

When using JPA, you can simply add the **@Version** annotation to your property. There is no need to define a getter or setter.

@Entity
public class MyEntity implements Serializable {    

    @Id
    @GeneratedValue
    private Long id;

    private String otherProperty;

    @Version
    private Long version;

    // Getter/Setter for ID and other properties
}

The table will need a new column called "**version**". You do not have to handle the version number yourself, the JPA provider will do it for you. If you want to use optimistic locking for all your entities, you may create an abstract class annotated with **@MappedSuperclass**.

import java.io.Serializable;
import javax.persistence.GeneratedValue; 
import javax.persistence.GenerationType; 
import javax.persistence.Id; 
import javax.persistence.MappedSuperclass; 
import javax.persistence.Version; 
@MappedSuperclass 
public abstract class AbstractEntity implements Serializable { 

private static final long serialVersionUID = 1L; 

@Id 
@GeneratedValue(strategy = GenerationType.AUTO) 
private Long id; 

@Version 
private Long version; 

public Long getId() { return id; } 

public void setId(Long id) { this.id = id; }

@Override 
public int hashCode() {
final int prime = 31; 
int result = 1; result = prime \* result + ((id == null) ? 0 : id.hashCode()); 
return result; 
} 

@Override 
public boolean equals(Object obj) { 
if (this == obj) return true; 

if (obj == null) return false; 

if (getClass() != obj.getClass()) return false; 

AbstractEntity other = (AbstractEntity) obj; 

if (id == null) { 
if (other.id != null) return false; 

} else if (!id.equals(other.id)) return false; 

return true; 

} 

}

 

Your entities should extend AbstractEntity.

public class MyEntity extends AbstractEntity
{

// properties

}

* * *

## Pessimistic Locking

Pessimistic Locking blocks database records for a single user, until the lock is released. This offers a higher integrity than optimistic locking, but may cause a deadlock in a bad application design/architecture (lock is never released). To use pessimistic locking, either a direct database connection or a unique transaction ID for identification is needed. Just like optimistic locking, the transaction is rolled back, when an error occurs.

If you expect many collisions, which would interfere with your data consistency and integrity, you should use pessimistic locking. Keep in mind that pessimistic locking is predictable, but also reduces the concurrency.

There are three different kinds of Locking

- PESSIMISTIC\_READ - If a transaction reads an entity, the entity is blocked but allows other transactions to **READ**
- PESSIMISTIC\_WRITE - If a transaction writes an entity, it is blocked and forbids reading, writing and deleting
- PESSIMISTIC\_FORCE\_INCREMENT - If a transaction reads an entity, the version-attribute (if existent) is increased

@PersistenceContext
  private EntityManager entityManager;

  public void decreaseStock(String id) {
      Product product = 
          entityManager.find(Product.class, id);
      entityManager.lock(product,
          LockModeType.OPTIMISTIC\_WRITE);
      product.setStock(product.getStock() - 1);
  }
