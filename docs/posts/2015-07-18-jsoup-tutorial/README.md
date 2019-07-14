---
title: "Jsoup Tutorial: Parsing a website with Java"
date: "2015-07-18"
---

[Jsoup](http://jsoup.org/) is a library allowing us to

- parse HTML from an URL, file or string
- Extract data from the DOM, i.e. by using CSS selectors
- Manipulate HTML elements, attributes and texts
- Generate clean HTML

In this Jsoup tutorial, I am going to show you how to parse a website and extract data.

First off, you need to include the jsoup dependency. For news, changelog and bug reports, check out the [official Jsoup page](http://jsoup.org/news/).

```xml
<dependency>
  <groupId>org.jsoup</groupId>
  <artifactId>jsoup</artifactId>
  <version>1.10.2</version>
</dependency>
```

## Parsing a document

Start by parsing HTML into a **Document**. Henceforth, we are working with that **Document**. Jsoup is called statically. Jsoup offers the following variants of parsing HTML.

[![Jsoup - Methoden zum Parsen eines Dokumentes](https://kevcodez.de/wp-content/uploads/2015/07/jsoup-static-factory-methods.png)](https://kevcodez.de/wp-content/uploads/2015/07/jsoup-static-factory-methods.png)

To parse a website to a document, you can simply call the following method

```java
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class WebsiteParser {

  private static final int TIMEOUT\_IN\_MS = 5000;
  
  public static void main(String\[\] args) throws MalformedURLException, IOException
  {
    Document doc = Jsoup.parse(new URL("url"), TIMEOUT\_IN\_MS);
    
    System.out.println(doc.html());
  }
  
}
```

## Extract Data

Once we parsed the HTML to a document, we can start extracting data. Jsoup offers quite a few ways to do so, for example...

- **getElementById** - Returns a HTML element (org.jsoup.nodes.Element) by the given ID
- **getElementsByTag** - Returns a list of HTML elements (org.jsoup.select.Elements) with the given tag
- **getElementsByClass** - Returns a list of HTML elements (org.jsoup.select.Elements) with the given CSS class
- **getElementsByAttribute** - Returns a list of HTML elements (org.jsoup.select.Elements) containing the given attribute
- **select** - Returns a list of HTML elements (org.jsoup.select.Elements) matching the given CSS selector

You can also apply further selectors on **org.jsoup.select.Elements**, making the following example valid

```html
Elements tables = doc.getElementsByAttribute("table");
    
for(Element table : tables)
{
   Elements tableRows = table.getElementsByAttribute("tr");
   
  for(Element tableRow : tableRows)
  {
    Elements tableData = tableRow.getElementsByTag("td");
        
     // ...
   }
}
```

## CSS Selector

As mentioned previously, the select method makes it possible to select HTML elements by providing a CSS selector.

Elements links = doc.select("a\[href\]"); // Get all links with a href attribute present
    
Elements gifs = doc.select("img\[src$=.gif\]"); // Get all images that are gifs

Element tableRows = doc.select("table.versions > tbody > tr").first(); // Get all table rows "tr" within a tbody element, in a table element with the class versions

Elements resultLinks = doc.select("span > a"); // Get all links within a span element
    
Elements lastTableChild = doc.select("table > tbody > tr:last-child"); // Get the last child of a table row within a table body within a tables

### Overview of selectors

- **`tagname`**: Finds the element with the given tag, i.e. a or div
- **`ns|tag`**: Finds the elements from a given tag in a specific namespace, fb|name matches <fb:name> elements
- **`#id`**: Finds elements by the given ID, i.e. #eow-title
- **`.class`:** Finds elements with the given class, i.e. .versionsfinds all elements with the versions class
- **`[attribute]`:** Finds all elements with the given attribute, i.e. \[href\] or \[name\]
- **`[^attr]`:** Finds all ements with the given prefix as attribute name, i.e. \[^data-\] `findet alle elements with HTML5 data-attributes`
- **`[attr=value]`:** Finds all elements with the given attribute and value, i.e. \[width=500\]
- **`[attr^=value]`, `[attr$=value]`, `[attr*=value]`:** Finds all elements, that start/end/contain the attributes value, i.e. \[href\*=/path/\] `finds all elements, whose href attributes contain /path/ in it's value`
- **`[attr~=regex]`:** Finds all elements, matchign the given regex, i.e. `img[src~=(?i)\.(png|jpe?g)]`
- **`*`:** Finds all elements

### Combining selectors

- **`el#id`:** Elements with the ID, i.e. div#logo
- **`el.class`:** Elements with the class, i.e. `div.masthead`
- **`el[attr]`:** Elements with the given attribute, i.e. `a[href]`
- Concatted, i.e. `a[href].highlight`
- **`ancestor child`:** Child elements, that have a specific parent, i.e. `.body p` finds all `p` elements, that are children (not just directly), of an element with a body class
- **`parent > child`:** Finds the direct child element, i.e.div.content > p `finds all p elements, that are direct children of a div with the class content`
- **`el, el, el`:** Group multiple selectors, i.e. `div.masthead, div.logo`

[List of all selectors on Jsoup.org](http://jsoup.org/cookbook/extracting-data/selector-syntax)

## Real-World example - Parsing dependency versions from mvnrepository.com

Theory is one thing, but let us see Jsoup in action with a real-world example.

Let's try parsing the dependency versions from a library, let's take [Async-Http-Client from com.ning](http://mvnrepository.com/artifact/com.ning/async-http-client).

This is how the source code of the page looks like:

```html
<table class="grid versions" width="100%">
   <thead>
      <tr>
         ....
      </tr>
   </thead>
   <tbody>
      <tr>
         <td rowspan="56">
            <div><span><b>1.9</b>.x</span></div>
         </td>
         <td><a href="/artifact/com.ning/async-http-client/1.9.30" class="vbtn release">1.9.30</a></td>
         <td>
            <div><a href="/artifact/com.ning/async-http-client/1.9.30/usages">2</a><span class="rankingbar" style="width: 7px; "></span></div>
         </td>
         <td>release</td>
         <td> (Jul, 2015) </td>
      </tr>
      ...
  </tbody>
</table>
```

We want to parse the exact version (1.9.30), the type (release) - could be release, beta, general availability or something else and the usages (2).

Let's create a POJO representing a dependency.

```java
public class MavenDependency {

  private String group;
  private String artifact;
  private String version;

  private int usages;
  private String type;

 // Konstruktor

 // Getter & Setter

 // ToString

}
```

Start by parsing the website

```java
// Parse website with a 5 secodn timeout
Document document = Jsoup.parse(new URL("http://mvnrepository.com/artifact/com.ning/async-http-client"), 5000);
```

Using the css selector **table.versions > tbody > tr**, we get all rows containing the versions. It is important to select the tbody, else we wil also get unnecessary information from the tables's head.

Elements versionRows = document.select("table.versions > tbody > tr");

Now that we have the rows, we continue extracting the exact information for a single dependency entry by applying CSS selectors.

- **Version:** td > a.vbtn - Link with the class vbtn in a td element
- **Usages:** td:nth-last-child(3) - The third last child from the td element
- **Type:** td:nth-last-child(2) - The second last child from the td element

There are probably a bunch of other ways to access this data. This is how the entire code looks like

```java
public class MavenParser {

  private static final String MVN\_REPO\_BASE\_SEARCH\_URL = "http://mvnrepository.com/artifact/";

  public static void main(String\[\] args) throws MalformedURLException, IOException {
    List<MavenDependency> availableDependencies = getMavenResults("com.ning", "async-http-client"); // -> http://mvnrepository.com/artifact/com.ning/async-http-client
    
    availableDependencies.forEach(System.out::println);
  }

  public static List<MavenDependency> getMavenResults(String group, String artifact) 
      throws MalformedURLException, IOException {
    String url = MVN\_REPO\_BASE\_SEARCH\_URL + group + "/" + artifact;

    // Parse website with 5 seconds timeout
    Document document = Jsoup.parse(new URL(url), 5000);

    // All versions as table rows
    Elements versionRows = document.select("table.versions > tbody > tr");

    List<MavenDependency> mvnResults = new ArrayList<>();

    // Parse a single table row
    for (Element tr : versionRows) {
      String version = tr.select("td > a.vbtn").get(0).text();
      
      int usages = Integer.parseInt(tr.select("td:nth-last-child(3)").get(0).text());
      
       String type = tr.select("td:nth-last-child(2)").get(0).text();

      mvnResults.add(new MavenDependency(group, artifact, version, usages, type));
    }

    return mvnResults;
  }

}
```
