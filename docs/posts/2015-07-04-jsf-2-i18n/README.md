---
title: "JSF 2 I18N: How To internationalise your application"
date: "2015-07-04"
---

In this post, I'd like to show you, how to internationalise your JSF application.

## Project structure in Eclipse

\[caption id="attachment\_234" align="aligncenter" width="268"\][![JSF 2 Multilanguage - Eclipse project structure](http://kevcodez.de/wp-content/uploads/2015/07/jsf_multilanguage_project_structure.png)](https://kevcodez.de/wp-content/uploads/2015/07/jsf_multilanguage_project_structure.png) JSF 2 Multilanguage - Eclipse project structure\[/caption\]

* * *

## Create and edit Properties-Files

We start off by creating a new package for the languages - I'll call it _de.kevcodez.internationalization_. In this package, each language gets a .propertes.file. We'll make a simple example and support two languages - Englisch and German, by creating **language\_en.properties** and **language\_de.properties**.

\[caption id="attachment\_226" align="aligncenter" width="654"\][![Neue Datei erstellen](http://kevcodez.de/wp-content/uploads/2015/07/new_file.png)](http://kevcodez.de/wp-content/uploads/2015/07/new_file.png) Neue Datei erstellen\[/caption\]

To edit a properties file, I recommend **Localized Properties Editor Eclipse Plugin**. With that Plugin, you can edit multiple languages at once. To add a new key, hit Rightclick -> **Add Key**. The key will later be our identifier.

\[caption id="attachment\_225" align="aligncenter" width="955"\][![Localized Properties Editor](http://kevcodez.de/wp-content/uploads/2015/07/localized_properties_editor.png)](http://kevcodez.de/wp-content/uploads/2015/07/localized_properties_editor.png) Localized Properties Editor\[/caption\]

* * *

##  Add localization to faces-confi

After setting up our translations, we have to register them in the application. To do that, we have to add the following to the faces-config.xml:

<application>
    <locale-config>
      <default-locale>en</default-locale>
    </locale-config>
    <resource-bundle>
      <base-name>de.kevcodez.internationalization.language</base-name>
      
      <var>msg</var>
    </resource-bundle>
  </application>

In this case, English is our default language. If you want German to be the default lokale, simply change _default-locale_ to **de**. The base-name needs to contain the name of your language files

* * *

##  Use localization

We entered a name for accessing the localization in the _faces-config.xml_ - **msg** (var attribute). Within XHTML, we can simply use the following to access it:

#{msg.Key}

Let's look at a simple Hello World example:

<div class="jumbotron">
              <h1>#{msg.Hello\_World}</h1>
              
              <hr />
              
              <h:form>
              	<span>#{msg.Enter\_your\_name}</span>
              	<h:inputText styleClass="form-control" value="#{helloWorldBean.name}" />
              	
              	<h:commandButton styleClass="btn btn-primary" value="#{msg.Submit}" style="margin-top: 10px" />
              </h:form>
              
              <h:panelGroup layout="block" rendered="#{!empty helloWorldBean.name}" style="margin-top: 20px">
              	<pre>#{msg.Hello} #{helloWorldBean.name}, #{msg.Whats\_Up}!</pre>
              </h:panelGroup>
          </div>

* * *

##  Change language

Alright, we got the localization working. But we cannot switch the language yet. To change the language, execute:

FacesContext.getCurrentInstance().getViewRoot().setLocale(

_locale_

);

However, we'd like to have a dropdown in the frontend, that contains all available languages. Upon switching the dropdown item, the language shall change.

The language is saved in a SessionScoped-Bean, so we can always retreive the language, the current user has set.

@Named
@SessionScoped
public class UserSessionBean implements Serializable
{

  private static final long serialVersionUID = 1523479642013931903L;

  private String currentLocale = Locale.ENGLISH.toString();

  private static Map<String, Locale> availableLocales;

  static
  {
    availableLocales = new LinkedHashMap<String, Locale>();
    availableLocales.put("English", Locale.ENGLISH);
    availableLocales.put("Deutsch", Locale.GERMAN);
  }

 
  public void setCurrentLocale(String newLocale)
  {
    this.currentLocale = newLocale;

    for (Entry<String, Locale> entry : availableLocales.entrySet())
    {
      if (entry.getValue().toString().equals(newLocale))
        FacesContext.getCurrentInstance().getViewRoot().setLocale(entry.getValue());
    }
  }
  

  public Map<String, Locale> getAvailableLocales()
  {
    return availableLocales;
  }

  public String getCurrentLocale()
  {
    return currentLocale;
  }

}

The languages get initialized once, statically, since they are not changed during runtime. When the language is changed using the setCurrentLocale() method, the upper function to switch a language in JSF is called.

Using a selectOneMenu, we can list the available languages and change the language upon selection.

<h:form>
          <span>#{msg.Change\_language}</span>
          <label class="select">
            <h:selectOneMenu value="#{userSessionBean.currentLocale}" onchange="submit()">
              <f:selectItems value="#{userSessionBean.availableLocales}" />
            </h:selectOneMenu>
            <i></i>
          </label>
</h:form>

By using _onchange="submit()"_  the form is submitted instantly, we do not need another button.

* * *

## Project Download

You can download the entire project here:

[HelloWorld JSF CDI Multilanguage als Projekt herunterladen](http://kevcodez.de/index.php/2015/07/jsf-2-multilanguage-mehrsprachige-jsf-applikationen/helloworld-cdi-multilanguage/)
