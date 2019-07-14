---
title: "Java 8 Lambda Tutorial: Beginning with Lambda and Streams"
date: "2015-07-19"
---

Java 8 introduced **Lambas** (or Closures). The _Iterable_ and the _Collection_ interface received some new methods. The API allows a functional programming approach - which was barely possible before. In this Java 8 Lambda Tutorial, I want to introduce you to the new functionality with pratical examples.

Before Java 8, filtering a list of persons by a specific name, looked like this

public List<Person> getPersonsWithName(List<Person> searchList,String firstName)
{
 List<Person> foundPersons = new ArrayList<>();
 
 for(Person p : searchList)
 {
     if(p.getFirstName().equals(firstName))
       foundPersons.add(p);
 }
 
 return foundPersons;
}

Using the new stream API on the Collection interface, we can do this

public List<Person> getPersonsWithName(List<Person> searchList,String firstName)
{
  return searchList.stream()
      .filter(p -> p.getFirstName().equals(firstName))
      .collect(Collectors.toList());
}

* * *

## Syntax

The basic syntax is _((Placeholder)_ -> _Condition/Action)_

List<String> lst = new ArrayList<>();
lst.forEach(str -> System.out.println(str));

The :: Operator offers a shortcut.

List<String> lst = new ArrayList<>();
lst.forEach(System.out::println);

* * *

All following examples are based on this Person class.

public class Person {

  private long id;
  private String firstName;
  private String secondName;
  private Gender gender;
  private LocalDate brithdate;

  private List<Person> friends;

  // Getter,Setter,Equals,HashCode,ToString
}

public enum Gender {
    MAN,WOMAN
}

The **persons** variable is a list of persons that is being initialized on program startup.

* * *

## ForEach

- foreach (from the Iterable-Interface)

// Prints all perons in console
persons.forEach(System.out::println);

// Prints all birthdates in console
persons.forEach(p -> System.out.println(p.getBrithdate()));

// Output persons, grouped by first name
Map<String, List<Person>> personsGroupedByFirstName = getPersonsGroupedByFirstName();
personsGroupedByFirstName.forEach((name, persons) -> System.out.printf("Name: %s, Vorkomnisse: %d%n", name, persons.size()));

* * *

## Stream/ParallelStream

- **stream()/parallelStream()** - Opens a stream for further processing - generally speaking, you first open the stream and then reduce, map or process it
- **filter()** \- Filters all elements based on the condition and returns a stream

// Filters a list based on the first name
persons.stream().filter(p -> p.getFirstName().equals(firstName))

The **min()/max()** method finds the minimum/maximum element, matching the given Comparator. Take a look how a comparator can be defined in Java 8

// Oldest person
persons.stream().min((p1, p2) -> p1.getBrithdate().compareTo(p2.getBrithdate()))

Using the **collect()** method, you can group or collect the entries from the stream. You cannot access the data from a stream, thus, after processing it, if you want to get the results, you need to collect them.

// Persons with a specifc name, collect them as list

persons.stream()
       .filter(p -> p.getFirstName().equals(firstName))
       .collect(Collectors.toList());

// Group persons by first name, returns a Map<String,List<Person>>
persons.stream().collect(Collectors.groupingBy(Person::getFirstName));

// Gruop perons by birthdate and frequency, returns Map<LocalDate,Long>
persons.stream().collect(Collectors.groupingBy(Person::getBrithdate, Collectors.counting()));

The **map()** method switches the stream's level to the given property. Given _getFirstName()_ returns a String, when mapping to it, we get a Stream of Strings, even though we started with a Stream of Persons. We could process the stream endlessly by filtering, mapping, reducing again.

// List of first names 
persons.stream()
       .map(Person::getFirstName)
       .collect(Collectors.toList());

You are probably familiar with the **distinct()** method. Distinct is used to only collect different results. Adding distinct to the previous code sample, we will only get unique first names.

// List of unique first names 
persons.stream()
       .map(Person::getFirstName)
       .distinct()
       .collect(Collectors.toList());

**limit()** limits the amount of results returned

// 5 persons
persons.stream().limit(5);

The **removeIf() method removes all elements matching the condition. Be aware that this is applied immediately to your collection, thus modifying it.**

// Remove all women from the list
persons.removeIf(p -> p.getGender().equals(Gender.WOMAN));

**anyMatch()** returns true, if any item in the collection matches the given condition

// Does any one have birthday on the given date?
persons.stream().anyMatch(p -> p.getBrithdate().equals(date));

**allMatch()** returns true, if all items in the collection match the given condition. The opposite method is **noneMatch()**.

// Tests, if all persons are men
persons.stream().allMatch(p -> p.getGender().equals(Gender.MAN));

**sorted()** sorts the stream, optionally taking a Comparator

// Default sorting
persons.stream().sorted()...

// Sort by last name
persons.stream().sorted((p1,p2) -> p1.getSecondName().compareTo(p2.getSecondName()))...

**findFirst()** finds the first Element in the stream. The return type is an _Optional<T>_, since the stream might be empty. Using **orElse()** we can provide an object, for the case, that the optional is empty and no result is found.

// Finds the person with the given ID, or returns null if none is found
persons.stream()
       .filter(p -> p.getId() == id)
       .findFirst()
       .orElse(null);

Using **Arrays.asStream()** or **Arrays.asList().stream()** you may stream an Array

// Build the sum of the array
Arrays.stream(new int\[\] {1,10,50,5,18}).sum();

As mentioned earlier, most methods (distinct(), map(),min(),max(), sorted()...) return a stream, allowing you to endlessly apply more methods.

persons.stream()
       .filter(p -> p.getFirstName().equals("Kevin"))
       .distinct()
       .sorted((p1, p2) -> p1.getSecondName().compareTo(p2.getSecondName()))
       .collect(Collectors.toList());

* * *

## Comparators/Komparatoren

Using the shiny, new lambda expressions. The basic syntax for defining a Comparator is _((Object1, Object2) -> Comparison)_.

// Sort persons by first name
persons.sort((p1, p2) -> p1.getFirstName().compareTo(p2.getFirstName()));

// Sort persons by birthdate
persons.sort((p1, p2) -> p1.getBrithdate().compareTo(p2.getBrithdate()));

* * *

## Lambda Expressions in Eclipse

If Eclipse fails to compile your lambda expressions, you probably have not yet set your Compilers compliance level to >= 1.8. Go to _Window -> Preferences_ and set **Compiler compliance level** **to at least 1.8.**

\[caption id="attachment\_349" align="aligncenter" width="697"\][![Eclipse Compiler auswählen](https://kevcodez.de/wp-content/uploads/2015/07/eclipse-compiler-settings.png)](https://kevcodez.de/wp-content/uploads/2015/07/eclipse-compiler-settings.png) Configure Eclipse Compiler\[/caption\]
