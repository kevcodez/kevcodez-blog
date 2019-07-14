---
title: "Project Lombok: Avoid Java Boilerplate Code"
date: "2015-07-11"
---

Boilerplate Code is code that you have to write in many places with minimale, if not none at all, change, just because you HAVE TO. The best examples are getters, setter, equals or hashcode methods. How many methods like _public Type getValue() { return value; } public setValue(Type value) { this.value = value; }_ have you written so far?

Project Lombok tries to reduce boilerplate code by providing annotations that generate code in the background

Imagine having a Person class with three properties (_firstName_, _lastName_ und _birthDate_). This small class quickly looks like this...

```java
public class Person
{

  private String firstName;
  private String lastName;
  private Date birthDate;

  @Override
  public String toString()
  {
    return "Person \[firstName=" + firstName + ", lastName=" + lastName + ", birthDate=" + birthDate + "\]";
  }

  @Override
  public int hashCode()
  {
    final int prime = 31;
    int result = 1;
    result = prime \* result + ((birthDate == null) ? 0 : birthDate.hashCode());
    result = prime \* result + ((firstName == null) ? 0 : firstName.hashCode());
    result = prime \* result + ((lastName == null) ? 0 : lastName.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj)
  {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    Person other = (Person) obj;
    if (birthDate == null)
    {
      if (other.birthDate != null)
        return false;
    }
    else if (!birthDate.equals(other.birthDate))
      return false;
    if (firstName == null)
    {
      if (other.firstName != null)
        return false;
    }
    else if (!firstName.equals(other.firstName))
      return false;
    if (lastName == null)
    {
      if (other.lastName != null)
        return false;
    }
    else if (!lastName.equals(other.lastName))
      return false;
    return true;
  }

  public String getFirstName()
  {
    return firstName;
  }

  public void setFirstName(String firstName)
  {
    this.firstName = firstName;
  }

  public String getLastName()
  {
    return lastName;
  }

  public void setLastName(String lastName)
  {
    this.lastName = lastName;
  }

  public Date getBirthDate()
  {
    return birthDate;
  }

  public void setBirthDate(Date birthDate)
  {
    this.birthDate = birthDate;
  }

}
```

Almost 100 lines of code. For three properties... Lombok offers the @Data annotation for this case.

```java
@Data
public class Person
{

  private String firstName;
  private String lastName;
  private Date birthDate;

}
```

That's it. We get getters, setters, equals, hashcode and even toString() methods generated automatically. Looking at the Eclipse outline, we still see, they are available.

[Lombok - @Data-Annotation Outline](./lombok_data_annotation.png)

## Installation/Usage of Project Lombok

On the official [Project Lombok Page](https://projectlombok.org/) you can download the current version. There are also setup instructions. For eclipse, simply download the jar file and execute it as admin. The IDE needs to integrate Lombok in order to properly display the outline. Every member of your team needs to have Lombok installed, in order to work with it.

[Projekt Lombok - Installation](./lombok_installation.png)

After installing Lombok, you need to include lombok as a dependency aswell. You need to use the provided scope.

```xml
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
  <version>1.16.4</version>
  <scope>provided</scope>
</dependency>
```

## Features from Project Lombok

We have seen the **@Data**\-Annotation, which is basically just a shortcort for other annotations Lombok has to offer.

**@Getter / @Setter** - Generates getters/setters on the field or class:

```java
private String firstName;
  
  public String getFirstName()
  {
    return firstName;
  }
  
  public void setFirstName(String firstName)
  {
    this.firstName = firstName;
  }
```

```java
@Getter @Setter
private String firstName;
```

* * *

**@Cleanup** - Automatically close resources such as InputStream or OutputStream:

```java
InputStream in = new FileInputStream(args\[0\]);
    try
    {
      byte\[\] b = new byte\[10000\];
      while (true)
      {
        int r = in.read(b);
        if (r == -1)
          break;
      }

    }
    finally
    {
      if (in != null)
      {
        in.close();
      }
    }
```

```java
@Cleanup InputStream in = new FileInputStream(args\[0\]);
byte\[\] b = new byte\[10000\];
while (true)
{
  int r = in.read(b);
  if (r == -1)
    break;
}
```

* * *

**@ToString** - Generates a toString() method

```java
@Override
  public String toString()
  {
    return "Person \[firstName=" + firstName + ", lastName=" + lastName + ", birthDate=" + birthDate + "\]";
  }
```

is replaced by using **@ToString** on the class.

* * *


**@EqualsAndHashCode** - Generates an equals() and hashCode() method

```java
@Override
  public int hashCode()
  {
    final int prime = 31;
    int result = 1;
    result = prime \* result + ((birthDate == null) ? 0 : birthDate.hashCode());
    result = prime \* result + ((firstName == null) ? 0 : firstName.hashCode());
    result = prime \* result + ((lastName == null) ? 0 : lastName.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj)
  {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    Person other = (Person) obj;
    if (birthDate == null)
    {
      if (other.birthDate != null)
        return false;
    }
    else if (!birthDate.equals(other.birthDate))
      return false;
    if (firstName == null)
    {
      if (other.firstName != null)
        return false;
    }
    else if (!firstName.equals(other.firstName))
      return false;
    if (lastName == null)
    {
      if (other.lastName != null)
        return false;
    }
    else if (!lastName.equals(other.lastName))
      return false;
    return true;
  }
```

is replaced by **@EqualsAndHashCode** on the class.

* * *

**@NoArgsConstructor** - Generates an empty constructor

```java
public Person()
{
  super();
}
```

is replaced by **@NoArgsConstructor** on the class.

* * *

**@AllArgsConstructor** - Generates a constructor with all class fields

```java
public Person(String firstName, String lastName, Date birthDate)
{
  super();
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthDate = birthDate;
}
```

is replaced by **@AllArgsConstructor** on the class.

* * *

 

For further documentation and features, please refer to the [official Project Lombok page](https://projectlombok.org/features/index.html).
