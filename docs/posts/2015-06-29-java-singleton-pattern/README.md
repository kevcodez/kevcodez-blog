---
title: "Java Singleton Pattern Beste und sicherste Umsetzung"
date: "2015-06-29"
---

Wikipedia definiert einen Singleton folgendermaßen

> Das **Singleton** (selten auch **Einzelstück** genannt) ist ein in der Softwareentwicklung eingesetztes Entwurfsmuster und \[...\] stellt sicher, dass von einer Klasse genau ein Objekt existiert. Dieses Singleton ist darüber hinaus üblicherweise global verfügbar.
> 
> Das Singleton findet Verwendung, wenn
> 
> - nur ein Objekt zu einer Klasse existieren darf und ein einfacher Zugriff auf dieses Objekt benötigt wird oder
> - das einzige Objekt durch Unterklassenbildung spezialisiert werden soll.

Bei einer Singleton-Klasse sollte defintiv sichergestellt werden, dass der Client das Objekt nicht neu instanziieren kann. Für die Umsetzung des Java Singleton Pattern gibt gibt es generell zwei Möglichkeiten, die ich euch mit den folgenden Code-Beispielen aufzeigen möchte.

* * *

## Möglichkeit #1

Eine **Static-Factory-Methode** zum wiedergeben der bereits vorhandenen Instanz...Ganz wichtig, wie bereits erwähnt, der private Konstruktor...

public class SingletonClass {

private static final SingletonClass INSTANCE = new SingletonInstance();

// Privater Konstruktor, ganz wichtig, damit diese Klasse nicht manuell instanziiert werden kann!
private SingletonClass() {
}

// Gibt die einmalige Instanz der Singleton-Klasse wieder
public static SingletonClass getInstance() { return INSTANCE; }

public void otherMethod() { ... }

}

* * *

## Möglichkeit #2 (Empfohlen)

Die zweite Möglichkeit, die ich allerdings noch nie in einem Produktivsystem gesehen habe, wobei nichts für mich dagegen spricht, ist die Erstellung eines **Enums** mit einem einzigen Typen. Enums können sowieso nur statisch aufgerufen werden. Der Enum hat einen einzigen Typen, über den dann sämtliche Methoden ausgeführt werden.

public enum SingletonClass {

INSTANCE;

public void otherMethod() { ... }

// Weitere Methoden

}

Diese Methode bietet mehrere Vorteile

- Bietet eine einfachere Möglichkeit der **Serialisierung**
- Garantiert absolut, dass nur eine Instanz existiert, selbst bei Reflection, somit die **sicherste** **Methode**
- Einfache und schnelle Implementierung

Genutzt wird dieser Enum dann wie jeder andere...

SingletonClass.INSTANCE.otherMethod();

* * *

Dieser Artikel nimmt sich Effective Java - Second Edition von Joshua Bloch als Vorbild in dem diese Vorschläge zum Java Singleton Pattern vorgeschlagen werden. Weitere Details zum Buch findet ihr unter [Effective Java - Second Edition von Joshua Bloch](http://kevcodez.de/index.php/2015/06/java-buch-effective-java-second-edition-von-joshua-bloch/).

\[caption id="attachment\_13" align="aligncenter" width="217"\][![Effective Java - Second Edition](https://kevcodez.de/wp-content/uploads/2015/06/Download-217x300.jpg "Effective Java - Second Edition")](https://www.amazon.de/gp/product/0321356683/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=0321356683&linkCode=as2&tag=kevc01-21&linkId=SEPB46CIBCWK6MWL) Effective Java - Second Edition\[/caption\]
