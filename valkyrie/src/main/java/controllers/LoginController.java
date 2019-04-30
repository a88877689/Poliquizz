package controllers;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ModelDriven;
import com.opensymphony.xwork2.interceptor.ValidationAware;
import com.opensymphony.xwork2.validator.annotations.RequiredFieldValidator;
import com.opensymphony.xwork2.validator.annotations.RequiredStringValidator;
import com.opensymphony.xwork2.validator.annotations.Validations;
import dao.implementation.UserDaoImpl;
import model.Token;
import model.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.struts2.convention.annotation.AllowedMethods;
import org.apache.struts2.interceptor.validation.SkipValidation;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.apache.struts2.rest.RestActionSupport;

@AllowedMethods({"options", "execute"})
public class LoginController extends RestActionSupport implements ModelDriven<Object>, ValidationAware {
    private static final Logger logger = LogManager.getLogger(LoginController.class);

    private UserDaoImpl userDaoImpl = new UserDaoImpl();

    private User user = new User();
    private Token token;

    @Validations(
        requiredFields = {
            @RequiredFieldValidator(fieldName = "username", message = "This field is required."),
            @RequiredFieldValidator(fieldName = "password", message = "This field is required.")
        }
    )
    public String create() {
        token = new Token("hello world");

        return Action.SUCCESS;
    }

    @SkipValidation
    public HttpHeaders options() {
        return super.options();
    }

    public void validate() {
        User result = userDaoImpl.findByUsernameAndPassword(
            user.getUsername(), user.getPassword()
        );

        if(result == null) {
            addActionError("Invalid credentials.");
        }
    }

    public Object getModel() {
        return (token != null ? token : user);
    }
}
