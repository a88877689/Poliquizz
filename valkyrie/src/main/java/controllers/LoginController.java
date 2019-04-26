package controllers;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ValidationAwareSupport;
import com.opensymphony.xwork2.validator.annotations.RequiredFieldValidator;
import dao.implementation.UserDaoImpl;
import model.User;

public class LoginController extends ValidationAwareSupport {
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
        validate();

        return Action.SUCCESS;
    }

    public void validate() {
        User user = userDaoImpl.findByUsernameAndPassword(this.username, this.password);

        if(user == null) {
            addFieldError("password", "Invalid credentials.");
        }
    }
}
