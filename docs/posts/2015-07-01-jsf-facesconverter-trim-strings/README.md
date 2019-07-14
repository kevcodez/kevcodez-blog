---
title: "JSF: Automatically trim strings using FacesConverter"
date: "2015-07-01"
---

Image having a registration form or any other form of textual user input. If the user accidentally or purposely types a space at the end of the input, other issues could follow up - double spaces, a username with spaces that does not work for login, because the user does not know.

We could, of course, trim every string before saving, or define it in every setter/getter. However, there is a more simple way to automatically trim all strings.

Using a **FacesConverter**, we can intercept every string input and modify it. We are using the _javax.faces.convert.Converter_\-Interface that defines two methods:

public Object getAsObject(FacesContext context, UIComponent component, String value);

public String getAsString(FacesContext context, UIComponent component, Object value);

Using the **@FacesConverter**\-Annotation, the converter is registered automatically. The annotation has a property named forClass, that defines the data type for which we want to use the converter. Let's define a converter for intercepting all Strings and trim them:

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

@FacesConverter(forClass = String.class)
public class StringTrimmer implements Converter
{

  @Override
  public Object getAsObject(FacesContext context, UIComponent component, String value)
  {
    return value != null ? value.trim() : null;
  }

  @Override
  public String getAsString(FacesContext context, UIComponent component, Object value)
  {
    return value.toString();
  }

}

That's it. By using **_forClass = String.class_**, the converter will automatically intercept any String. If we don't specify forClass, the converter will only be used when explicitly defined in the XHTML. If we want to define an alternative name for the converter, we can do so by defining the value-attribute of the FacesConverter-Annotation.

<h:inputText value="#{registrationBean.username}" required="true">
   <f:converter converterId="stringTrimmer" />
</h:inputText>
