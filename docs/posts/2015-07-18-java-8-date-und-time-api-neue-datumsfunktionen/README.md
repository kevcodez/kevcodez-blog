---
title: "Java 8 Date Time API: Jodatime based date and time functions"
date: "2015-07-18"
---

Java 8 contains a brand new Joda-time inspired Date Time API within the **java.time** package. About time!

The following image offers an overview of the API's structure.

\[caption id="attachment\_330" align="aligncenter" width="862"\][![UML Modell - Source: heise.de](https://kevcodez.de/wp-content/uploads/2015/07/Abbildung-UMLModell-Class-java-time-Kernklassen-3f94267461887b37.png)](https://kevcodez.de/wp-content/uploads/2015/07/Abbildung-UMLModell-Class-java-time-Kernklassen-3f94267461887b37.png) UML Modell - Source: heise.de\[/caption\]

## LocalDate

Let's have a look at **java.time.LocalDate** first. A LocalDate represents a single Date in a specific year, month and date, no time. If you also need the time, you can use the LocalDateTime class, but let us focus on the LocalDate for now.

```java
// Today
LocalDate currentDate = LocalDate.now();

// Is the current year a leap year?
boolean isLeapYear = currentDate.isLeapYear();

// 10.02.2014
LocalDate tenthFeb2014 = LocalDate.of(2014, Month.FEBRUARY, 10);

// Month start with 1, 01.08.2014
LocalDate firstAug2014 = LocalDate.of(2014, 8, 1);

// The 65th day in 2010 (06.03.2010)
LocalDate sixtyFifthDayOf2010 = LocalDate.ofYearDay(2010, 65);
```

## LocalTime

The class java.time.LocalTime represents a time with a specific hour, minute, second and nanosecond.

```java
LocalTime currentTime = LocalTime.now(); // Current time
LocalTime midday = LocalTime.of(12, 0); // 12:00 Uhr
LocalTime afterMidday = LocalTime.of(13, 30, 15); // 13:30:15 O'clock
 
// 12345th second of the day (03:25:45 Uhr)
LocalTime fromSecondsOfDay = LocalTime.ofSecondOfDay(12345);
```

## LocalDateTime

The class LocalDateTime combines LocalTime and LocalDate and offers a date (year, month, day) + time (hour, minute, second, nanosecond).

```java
// Current date with time
LocalDateTime currentDateTime = LocalDateTime.now();
 
// 02.10.2014 12:30 O'clock
LocalDateTime secondAug2014 = LocalDateTime.of(2014, 10, 2, 12, 30);
 
// 24.12.2014 12:00 O'clock
LocalDateTime christmas2014 = LocalDateTime.of(2014, Month.DECEMBER, 24, 12, 0);
```

## Information about Date and Time

```java
LocalDate date = LocalDate.of(2014, 2, 15); // 15.02.2014
 
boolean isBefore = LocalDate.now().isBefore(date); // false
 
// Information about the month
Month february = date.getMonth(); // February
int februaryIntValue = february.getValue(); // 2
int minLength = february.minLength(); // 28
int maxLength = february.maxLength(); // 29 (due to leap year)
Month firstMonthOfQuarter = february.firstMonthOfQuarter(); // January, first month of quarter

// Information about the year
int year = date.getYear(); // 2014
int dayOfYear = date.getDayOfYear(); // 46
int lengthOfYear = date.lengthOfYear(); // 365
boolean isLeapYear = date.isLeapYear(); // false (no leap year)
 
DayOfWeek dayOfWeek = date.getDayOfWeek();
int dayOfWeekIntValue = dayOfWeek.getValue(); // 6
String dayOfWeekName = dayOfWeek.name(); // SATURDAY
 
int dayOfMonth = date.getDayOfMonth(); // 15
LocalDateTime startOfDay = date.atStartOfDay(); // 15.02.2014 00:00 O'clock
 
// Informationen über eine Zeit
LocalTime time = LocalTime.of(15, 30); // 15:30:00 O'clock
int hour = time.getHour(); // 15
int second = time.getSecond(); // 0
int minute = time.getMinute(); // 30
int secondOfDay = time.toSecondOfDay(); // 55800
```

## Manipulate Date and Time

With the new Date Time API, you can easily manipulate date and time.

```java
// Tomorrow
LocalDate tomorrow = LocalDate.now().plusDays(1);
 
// 5 hours and 30 minutes ago
LocalDateTime dateTime = LocalDateTime.now().minusHours(5).minusMinutes(30);

The TemporalAdjusters also come in handy. Import  **java.time.temporal.TemporalAdjusters.\***.

LocalDate date = LocalDate.of(2014, Month.FEBRUARY, 25); // 25.02.2014
 
// First day of february - 01.02.2014
LocalDate firstDayOfMonth = date.with(TemporalAdjusters.firstDayOfMonth());
 
// Last day of february - 28.02.2014
LocalDate lastDayOfMonth = date.with(TemporalAdjusters.lastDayOfMonth());
```

## TimeZones

If we need to handle time zones with the new Date Time API, we can use **java.time.ZonedDateTime** or **java.time.OffsetDateTime**.

```java
ZoneId losAngeles = ZoneId.of("America/Los\_Angeles");
ZoneId berlin = ZoneId.of("Europe/Berlin");
 
// 20.02.2014 12:00 O'clock
LocalDateTime dateTime = LocalDateTime.of(2014, 02, 20, 12, 0);
 
// 20.02.2014 12:00 O'clock, Europe/Berlin (+01:00)
ZonedDateTime berlinDateTime = ZonedDateTime.of(dateTime, berlin);
 
// 20.02.2014 03:00 O'clock, America/Los\_Angeles (-08:00)
ZonedDateTime losAngelesDateTime = berlinDateTime.withZoneSameInstant(losAngeles);
 
int offsetInSeconds = losAngelesDateTime.getOffset().getTotalSeconds(); // -28800
 
// A set of all available zones
Set<String> allZoneIds = ZoneId.getAvailableZoneIds();
 
// Working with offsets
LocalDateTime date = LocalDateTime.of(2013, Month.JULY, 20, 3, 30);
ZoneOffset offset = ZoneOffset.of("+05:00");
 
// 20.07.2013 03:30 O'clock +05:00
OffsetDateTime plusFive = OffsetDateTime.of(date, offset);
 
// 19.07.2013 20:30 O'clock -02:00
OffsetDateTime minusTwo = plusFive.withOffsetSameInstant(ZoneOffset.ofHours(-2));
```

## Timestamps

Using **java.time.Instant**, we may use timestampts. Such Timestamp begins at the 1st January of 1970, also known as EPOCH. The values of the instant may be negative. The standard used is [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601).

```java
// Current time
Instant now = Instant.now();
 
// Unix timestamp, 01.01.2010 12:00:00 O'clock
Instant fromUnixTimestamp = Instant.ofEpochSecond(1262347200);
 
// Same time in ms
Instant fromEpochMilli = Instant.ofEpochMilli(1262347200000l);
 
// Parse ISO 8601
Instant fromIso8601 = Instant.parse("2010-01-01T12:00:00Z");
 
// toString() returns theISO 8601 formatted String, Z.B. 2014-02-15T01:02:03Z
String toIso8601 = now.toString();
 
// Convert to Unix timestamp
long toUnixTimestamp = now.getEpochSecond();
 
// In ms
long toEpochMillis = now.toEpochMilli();
 
// Plus/Minus methods are also available
Instant nowPlusTenSeconds = now.plusSeconds(10);
```

## **Periods and Durations**

Period and Duration are two important classes in the new Date Time API. A Period is based on a date and a Duration is based on a time. Duration is used by Instants. Periods and duration may be negative, if the first date or time is after the second date or time.

```java
// Periods
 
LocalDate firstDate = LocalDate.of(2010, 5, 17); // 17.05.2010
LocalDate secondDate = LocalDate.of(2015, 3, 7); // 07.03.2015
Period period = Period.between(firstDate, secondDate);
 
int days = period.getDays(); // 18
int months = period.getMonths(); // 9
int years = period.getYears(); // 4
boolean isNegative = period.isNegative(); // false
 
Period twoMonthsAndFiveDays = Period.ofMonths(2).plusDays(5);
LocalDate sixthOfJanuary = LocalDate.of(2014, 1, 6);
 
// Add two months and 5 days to 06.01.2014 -> 11.03.2014
LocalDate eleventhOfMarch = sixthOfJanuary.plus(twoMonthsAndFiveDays);
 
 
// Durations
 
Instant firstInstant= Instant.ofEpochSecond( 1294881180 ); // 13.01.2011 01:13 Uhr
Instant secondInstant = Instant.ofEpochSecond(1294708260); // 11.01.2011 01:11 Uhr
 
Duration between = Duration.between(firstInstant, secondInstant);
 
// Negative, because first instant is after secondInstant (-172920)
long seconds = between.getSeconds();
 
// Result in minutes (2882)
long absoluteResult = between.abs().toMinutes();
 
// Two hours in seconds (7200)
long twoHoursInSeconds = Duration.ofHours(2).getSeconds();
```

## **Formatting and Parsing**

Using the methods **format()** **and parse()** you can easily parse date and time.

```java
// 01.04.2014 10:45 O'clock
LocalDateTime dateTime = LocalDateTime.of(2014, Month.APRIL, 1, 10, 45);
 
// Format as basic ISO date (20140220)
String asBasicIsoDate = dateTime.format(DateTimeFormatter.BASIC\_ISO\_DATE);
 
// Format as ISO week date (2014-W08-4)
String asIsoWeekDate = dateTime.format(DateTimeFormatter.ISO\_WEEK\_DATE);
 
// Format as ISO date time (2014-02-20T20:04:05.867)
String asIsoDateTime = dateTime.format(DateTimeFormatter.ISO\_DATE\_TIME);
 
// Format with a predefined pattern (01/04/2014)
String asCustomPattern = dateTime.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
 
// German (localized) formatting (1. April 2014)
String germanDate = dateTime.format(DateTimeFormatter.ofPattern("d. MMMM yyyy", new Locale("de")));
 
// German formatting, shortened (01.04.14 10:45)
DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT)
    .withLocale(new Locale("de"));
String germanDateTime = dateTime.format(formatter);
 
// Parsing dates
LocalDate fromIsoDate = LocalDate.parse("2014-01-20");
LocalDate fromIsoWeekDate = LocalDate.parse("2014-W14-2", DateTimeFormatter.ISO\_WEEK\_DATE);
LocalDate fromCustomPattern = LocalDate.parse("20.01.2014", DateTimeFormatter.ofPattern("dd.MM.yyyy"));
```

## **Conversion**

We also need an option to convert from the old Date API.

```java
// LocalDate/LocalTime <-> LocalDateTime
LocalDate date = LocalDate.now();
LocalTime time = LocalTime.now();
LocalDateTime dateTimeFromDateAndTime = LocalDateTime.of(date, time);
LocalDate dateFromDateTime = LocalDateTime.now().toLocalDate();
LocalTime timeFromDateTime = LocalDateTime.now().toLocalTime();
 
// Instant <-> LocalDateTime
Instant instant = Instant.now();
LocalDateTime dateTimeFromInstant = LocalDateTime.ofInstant(instant, ZoneId.of("America/Los\_Angeles"));
Instant instantFromDateTime = LocalDateTime.now().toInstant(ZoneOffset.ofHours(-2));
 
// Convert from old Date/Calendar/Timezone classes
Instant instantFromDate = new Date().toInstant();
Instant instantFromCalendar = Calendar.getInstance().toInstant();
ZoneId zoneId = TimeZone.getDefault().toZoneId();
ZonedDateTime zonedDateTimeFromGregorianCalendar = new GregorianCalendar().toZonedDateTime();
 
// Convert to old classes
Date dateFromInstant = Date.from(Instant.now());
TimeZone timeZone = TimeZone.getTimeZone(ZoneId.of("America/Los\_Angeles"));
GregorianCalendar gregorianCalendar = GregorianCalendar.from(ZonedDateTime.now());
```

## Sources

As main source for this article and code samples, visit [mscharhag.com](http://www.mscharhag.com/2014/02/java-8-datetime-api.html).
