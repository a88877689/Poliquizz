package controllers;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.validator.annotations.RequiredFieldValidator;
import dao.implementation.UserDaoImpl;
import model.User;
import org.apache.struts2.convention.annotation.AllowedMethods;
import org.apache.struts2.interceptor.validation.SkipValidation;
import org.apache.struts2.rest.DefaultHttpHeaders;
import org.apache.struts2.rest.HttpHeaders;
import org.apache.struts2.rest.RestActionSupport;

@AllowedMethods({"options", "execute"})
public class LoginController extends RestActionSupport {
    private UserDaoImpl userDaoImpl = new UserDaoImpl();

    private String username;
    private String password;

    @RequiredFieldValidator(message = "This field is required.")
    public void setPassword(String password) {
        this.password = password;
    }

    @RequiredFieldValidator(message = "This field is required.")
    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public String create() {
        return Action.SUCCESS;
    }

    @SkipValidation
    public HttpHeaders options() {
        return super.options();
    }

    public void validate() {
        User user = userDaoImpl.findByUsernameAndPassword(this.username, this.password);

        if(user == null) {
            addFieldError("password", "Invalid credentials.");
        }
    }
}
