---
title: "Alternative zum Java Konstruktor: Static Factory Methods"
date: "2015-06-29"
---

## Einleitung

Als Vorbild dieses Artikels dient [Effective Java - Secondary Edition by Joshua Bloch](https://www.amazon.de/gp/product/0321356683/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=0321356683&linkCode=as2&tag=kevc01-21&linkId=SEPB46CIBCWK6MWL). Der normale Weg ein Objekt zu instanziieren ist es, einen Konstruktor aufzurufen. Neben dem herkömmlichen Java Konstruktor solltest du dich jedoch auch mal mit **Static Factory Methods** beschäftigen.

* * *

## Beispiel

Ein Beispiel für eine solche Methode bietet die Boolean-Klasse.

```java
public static Boolean valueOf(boolean b) {

return b ? Boolean.TRUE : Boolean.FALSE;

}
```

**Static Factory Methods** können natürlich parallel zum Konstruktor bestehen. Vielleicht fragst du dich jetzt, wozu das Ganze?

* * *

## Vorteile

Folgende Vorteile bieten **Static Factory Methods**...

1. Im Gegensatz zu Konstruktoren, kann ein Name frei gewählt werden. Wenn du jetzt 5 verschieden parametrisierte Konstruktoren hast, wird es für einen externen Entwickler etwas schwierig, den richtigen Konstruktor zu wählen. Wenn die Methoden zur Instanziierung jedoch eindeutig benamt sind, wird es hier keine Probleme geben.
2. Static Factory Methods müssen nicht zwingend immer eine neue Instanz eines Objekt erstellen
3. Der Rückgabetyp ist frei definierbar und kann demnach auch eine Subklasse sein
4. Reduziert den geschriebenen Code bei parametrisierten Typ-Instanzen

Ein Beispiel für Punkt 4 ist das java.util.Map-Interface...

```java
Map<Integer, List> map = new HashMap<Integer, List>();
```

Mit einer Static Factory Method wäre folgendes möglich...

```java
public static <K, V> HashMap<K, V> createInstance() {

return new HashMap<K, V>();

}
```

Dadurch können wir die HashMap nun folgendermaßen instanziieren...

```java
Map<Integer, List> map = HashMap.createInstance();
```

* * *

## Nachteile

Das klingt natürlich alles schön und gut...aber **Static Factory Methods** bringen natürlich auch Nachteile mit sich ;)

1. Wenn eine Klasse nur Static Factory Methods zur Instanziierung bietet und keine Konstruktoren mit _public_ oder _protected_ als Sichtbarkeit, kann diese Klasse nicht als Subklasse fungieren
2. Wenn jetzt noch weitere _public static_ Funktionen im Code enthalten sind, sind die **Static Factory Methods **nicht auf den ersten Blick sichtbar und fallen entsprechend weniger auf als Konstruktoren

* * *

## Benamung der Static Factory Methods

Mir ist keine klare Konvention bekannt, aber Joshua Bloch schlägt folgende, sinnige Benamung vor...

- _valueOf_ - Gibt eine Instanz zurück, welche den selben Wert hat, wie der übergebene Parameter
- _of_ - Alternative zu _valueOf_, wird bei einem **EnumSet** präferiert
- _getInstance_ - Beliebt beim Singleton-Pattern, gibt immer die selbe Instanz wieder (Instanz wird nur einmal erstellt)
- _newInstance_ - Ähnlich wie _getInstance_, versichert jedoch, dass immer eine NEUE Instanz wiedergegeben wird

* * *

Wenn ihr also bei eurer nächsten Klasse Konstruktoren erstellen wollt, überlegt euch doch einmal, ob nicht eine **Static Factory Method** vielleicht sinnvoller wäre!

Wie bereits im ersten Satz erwähnt, dient als Vorbild das Buch [Effective Java: A Programming Language Guide (Java Series)](https://www.amazon.de/gp/product/0321356683/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=0321356683&linkCode=as2&tag=kevc01-21&linkId=SEPB46CIBCWK6MWL). Das Buch bietet 78 einzelne Beispiele samt Code.
