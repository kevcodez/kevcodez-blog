---
title: "Java Builder-Pattern: Too many (optional) parameters in a constructor"
date: "2015-06-29"
---

## Java Builder-Pattern - Introduction

I recently blogged about [Static Factory Methods](/posts/2015-06-29-alternative-zum-java-konstruktor-static-factory-methods/). 
Constructors and static factory methods have on thing in common: There are both not optimal, when having too many (optional) parameters.

## Telescoping-Constructor-Pattern

Let's take a simple Person-class with a **Telescoping-Constructor-Pattern**, which has multiple constructors to offer different ways to initiate the class.

```java
public class Person
{

  private String firstName; // required
  private String lastName; // required
  private String streetAddress;
  private String streetNumber;
  private String zipCode;
  private String country;

  public Person(String firstName, String lastName, String country)
  {
    this(firstName, lastName, null, null, null, country);
  }

  public Person(String firstName, String lastName)
  {
    this(firstName, lastName, null, null, null);
  }

  public Person(String firstName, String lastName, String streetAdress, String streetNumber, String zipCode)
  {
    this(firstName, lastName, streetAdress, streetNumber, zipCode, null);
  }

  public Person(String firstName, String lastName, String streetAddress, String streetNumber, String zipCode, String country)
  {
    this.firstName = firstName;
    this.lastName = lastName;
    this.streetAddress = streetAddress;
    this.streetNumber = streetNumber;
    this.zipCode = zipCode;
    this.country = country;
  }
  
  ...

}
```

This pattern has a couple of disadvantages:

1. Bad readability due to the amount constructors
2. Decreased maintainability

## JavaBeans-Pattern

An alternative is the **JavaBeans-Pattern**, where each member has a Getter and the class has an empty constructor.

```java
public class Person
{

  private String firstName; // required
  private String lastName; // required
  private String streetAddress;
  private String streetNumber;
  private String zipCode;
  private String country;

  public Person()
  {
  }

  /\* Getter & Setter \*/
  
}
```

We may construct and use the class like this:

```java
Person person = new Person();
person.setFirstName("First Name");
person.setLastName("Last Name");
person.setCountry("Country");
```

This solves the problems of the **Telescoping-Constructor-Pattern** with improved readability. However, this pattern allows inconsistency by splitting up the construction and value assignment. A easy-to-implement and good way to solve this, is using the **Builder-Pattern**.

## Java Builder-Pattern

Rather than instantiating the class directly, the client calls a constructor or static factory method and in return gets a Builder object. The client can now use setter-like methods to fill the optional parameters. To get the actual initiated object, the client calls the build() method.

Let's implement a simple builder pattern with out person class.

```java
public class Person
{

  private final String firstName; // required
  private final String lastName; // required
  private final String streetAddress;
  private final String streetNumber;
  private final String zipCode;
  private final String country;

  public static class Builder
  {

    private final String firstName; // required
    private final String lastName; // required
    private String streetAddress;
    private String streetNumber;
    private String zipCode;
    private String country;

    // Constructor of the builder contains the required members
    public Builder(String firstName, String lastName)
    {
      this.firstName = firstName;
      this.lastName = lastName;
    }

    public Builder streetAddress(String streetAddress)
    {
      this.streetAddress = streetAddress;
      return this;
    }

    public Builder streetNumber(String streetNumber)
    {
      this.streetNumber = streetNumber;
      return this;
    }

    public Builder zipCode(String zipCode)
    {
      this.zipCode = zipCode;
      return this;
    }

    public Builder country(String country)
    {
      this.country = country;
      return this;
    }

    @Override
    public Person build()
    {
      return new Person(this);
    }

  }

  private Person(Builder builder)
  {
    this.firstName = builder.firstName;
    this.lastName = builder.lastName;
    this.streetAddress = builder.streetAddress;
    this.streetNumber = builder.streetNumber;
    this.zipCode = builder.zipCode;
    this.country = builder.country;
  }

}
```

The constructor is private by intention to allow the user to only use the builder.

To create a person, we can now use the builder like this:

```java
Person person = new Person.Builder("Kevin", "G").country("Deutschland").build();
Person person2 = new Person.Builder("Kevin", "G").build();
Person person3 = new Person.Builder("Kevin", "G").streetAddress("Adresse").streetNumber("4").zipCode("21220").country("Deutschland").build();
```

As you can see, the **Java** **Builder-Pattern** has advantages over the **Constructors** and **Static Factory Methods**, if we have a lot of parameters.

This post was inspired by [Effective Java - Second Edition von Joshua Bloch](https://www.amazon.de/gp/product/0321356683/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=0321356683&linkCode=as2&tag=kevc01-21&linkId=SEPB46CIBCWK6MWL).

If you like this post, feel free to follow me or hit me up on [Twitter](https://twitter.com/kevcodez).