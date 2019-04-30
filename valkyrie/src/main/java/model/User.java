package model;

import com.opensymphony.xwork2.validator.annotations.RequiredFieldValidator;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name="user")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @Column(name="username")
    private String username;
    @Column(name="password")
    private String password;

    public User(Integer id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "ID:" + id.toString() + ":Username:" + username + ":Password:" + password;
    }

}