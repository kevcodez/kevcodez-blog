---
title: "JSF Regex Validator: Validate inputs with regex patterns"
date: "2015-07-07"
---

A common use-case for validation with regular expressions is an email input. I'm going to show you how to do JSF Regex validation using a FacesValidator. Let's take a simple contact form as an example:

```html
<h:form>
          <fieldset>                  
                        <div class="row">
                           <section class="col col-6">
                                <label class="label">E-Mail <span style="color:red">\*</span></label>
                                <h:message for="inputEmail" styleClass="h-message" />
                                <label class="input">
                                    <i class="icon-append fa fa-envelope-o"></i>
                                    <h:inputText id="inputEmail" value="#{contactUsBean.email}" required="true" requiredMessage="Bitte geben Sie Ihre E-Mail ein" validatorMessage="Die eingegebene E-Mail-Adresse ist ungültig" />
                                </label>
                            </section>
                        </div>
                        
                        <section>
                            <label class="label">Nachricht <span style="color:red">\*</span></label>
                            <h:message for="inputMessage" styleClass="h-message" />
                            <label class="textarea">
                                <i class="icon-append fa fa-comment"></i>
                                <h:inputTextarea id="inputMessage" value="#{contactUsBean.message}" style="height:150px" required="true" requiredMessage="Bitte geben Sie eine Nachricht ein" validatorMessage="Die eingegebene Nachricht ist ungültig "/>
                            </label>
                        </section>
                        
                        <section>
                        	<span><span style="color:red">\*</span> Pflichtfelder</span>
                        </section>
                        
                        <section>
                            <h:message for="captcha" styleClass="h-message" />
                            <p:captcha id="captcha" label="Captcha" language="de" theme="clean" required="true" requiredMessage="Bitte geben Sie den angezeigten Schriftzug ein" validatorMessage="Sie haben einen Falschen Wert eingegeben. Bitte versuchen Sie es erneut." />
                        </section>
                        
                    </fieldset>
                    
                    <h:commandButton action="#{contactUsBean.sendMessage()}" value="Nachricht senden" styleClass="btn-u" />
                   
        </h:form>
```

To verify the email, we could just implement a check in the **`sendMessage()`**\-method using regular expressions. However, we would have to do this check in every function that handles email addresses.

## JSF Regex Validation

A more elegant solution is to use a FacesValidator, that can be used in the XHTML.

To make a reusable Regex validator, let's define an abstract class that only takes a pattern.

```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.component.UIInput;
import javax.faces.context.FacesContext;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

public abstract class RegexValidator implements Validator
{

  @Override
  public void validate(FacesContext fc, UIComponent component, Object o) throws ValidatorException
  {
    // No value is not ok
    if (o == null || "".equals(o))
    {
      FacesMessage msg = new FacesMessage(getValidatorMessage(component), null);
      msg.setSeverity(FacesMessage.SEVERITY\_ERROR);
      throw new ValidatorException(msg);
    }

    String input = (String) o;

    Matcher matcher = getRegexPattern().matcher(input);

    if (!matcher.matches())
    {
      FacesMessage msg = new FacesMessage(getValidatorMessage(component), null);
      msg.setSeverity(FacesMessage.SEVERITY\_ERROR);
      throw new ValidatorException(msg);
    }
  }

  private String getValidatorMessage(UIComponent component)
  {
    String validatorMessage = ((UIInput) component).getValidatorMessage();

    return validatorMessage != null ? validatorMessage : getValidationErrorString();
  }

  protected abstract String getValidationErrorString();

  protected abstract Pattern getRegexPattern();

}
```

Let's now implement a specific JSF Regex Validator to validate emails by extending the RegexValidator.

```java
import java.util.regex.Pattern;

import javax.faces.validator.FacesValidator;

@FacesValidator("emailValidator")
public class EmailValidator extends RegexValidator
{

  private static final Pattern EMAIL\_PATTERN = Pattern.compile("\[-0-9a-zA-Z.+\_\]+@\[-0-9a-zA-Z.+\_\]+\\\\.\[a-zA-Z\]{2,4}");

  @Override
  protected String getValidationErrorString()
  {
    return "Geben Sie eine valide Email-Adresse ein";
  }

  @Override
  protected Pattern getRegexPattern()
  {
    return EMAIL\_PATTERN;
  }

}
```

To use the JSF Regex Validator, simply define it in the XHTML.

```html
<h:inputText id="inputEmail" value="#{contactUsBean.email}" required="true" requiredMessage="Bitte geben Sie Ihre E-Mail ein" validatorMessage="Die eingegebene E-Mail-Adresse ist ungültig">
     <f:validator validatorId="emailValidator" />
</h:inputText>
```