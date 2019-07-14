---
title: "JSF Required Checkbox using FacesValidator: Checkbox must be checked"
date: "2015-07-03"
---

You've probably came across the situtation of having a checkbox in a frontend that needs to be checked in order to continue. A common example for this case is accepting the terms of use in a registration form. A simple method for solving this, is checking the value in your registration method:

<label class="checkbox">
      <h:selectBooleanCheckbox value="#{bean.acceptsTAC}" id="idTAC" requiredMessage="Sie müssen die AGB akzeptieren." />
      <i></i>
      <span style="font-size: 13px">Ich akzeptiere die <a href="/generalTermsAndConditions" target="\_blank">AGB</a> und <a href="/privacyPolicy" target="\_blank">Datenschutzrichtlinien</a>.</span>
</label>

// Terms And Conditions
private boolean acceptsTAC;

public void setAcceptsTAC(boolean acceptsTAC)
{
  this.acceptsTAC = acceptsTAC;
}

public boolean isAcceptsTAC()
{
  return acceptsTAC;
}

public void doRegistration()
{
  if(!isAcceptsTAC())
  {
    // AGB wurde nicht akzeptiert
  }
  else
  {
    // AGB wurde akzeptiert
  }
}

This works. However, the form needs to be sent to the server first. required=true will also not work in this case. Also, if we have multiple places where we need to verify that a checkbox is checked, we have to duplicate the code.

* * *

## JSF Required Checkbox using FacesValidator

Wouldn't it be nicer to include our check during form validation? Let's use a **FacesValidator** to do exactly this. Our FacesValidator checks, if a component has a specific value. By using the **@FacesValidator** annotation, the validator is registered automatically and ready to be used in the XHTML.

package de.kevcodez.faces.validators;

import java.text.MessageFormat;

import javax.faces.application.FacesMessage;
import javax.faces.component.\*;
import javax.faces.context.FacesContext;
import javax.faces.validator.\*;

@FacesValidator(value = "requiredCheckboxValidator")
public class RequiredCheckboxValidator implements Validator
{

  private static final String ERROR\_WRONG\_COMPONENT = "Wrong component type, component must be UISelectBoolean.";

  @Override
  public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException
  {
    if (!(component instanceof UISelectBoolean))
    {
      throw new IllegalArgumentException(String.format(ERROR\_WRONG\_COMPONENT, component.getClass().getName()));
    }

    if (Boolean.FALSE.equals(value))
    {
      String requiredMessage = ((UIInput) component).getRequiredMessage();

      if (requiredMessage == null)
      {
        Object label = component.getAttributes().get("label");
        if (label == null || (label instanceof String && ((String) label).length() == 0))
          label = component.getValueExpression("label");

        if (label == null)
          label = component.getClientId(context);

        requiredMessage = MessageFormat.format(UIInput.REQUIRED\_MESSAGE\_ID, label);
      }

      throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY\_ERROR, requiredMessage, requiredMessage));
    }
  }

}

A sample usage of our RequiredCheckboxValidator:

<label class="checkbox">
      <h:selectBooleanCheckbox id="idTAC" requiredMessage="Sie müssen die AGB akzeptieren.">
           <f:validator validatorId="requiredCheckboxValidator" />
      </h:selectBooleanCheckbox>
      <i></i>
      <span style="font-size: 13px">Ich akzeptiere die <a href="/generalTermsAndConditions" target="\_blank">AGB</a> und <a href="/privacyPolicy" target="\_blank">Datenschutzrichtlinien</a>.</span>
</label>

When submitting the form, i.e. by pressing a button, the form is validated. If the checkbox is not checked, the **RequiredCheckboxValidator** will throw a _ValidatorException_. The _doRegistration()_ won't be invoked. All possible values of the selectBooleanCheckbox can be found here - [Tutorialspoint - selectBooleanCheckbox](https://www.tutorialspoint.com/jsf/jsf_selectbooleancheckbox_tag.htm).

The FacesValidator is reusable.
