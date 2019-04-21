package tests;

import dao.implementation.UserDaoImpl;
import java.util.ArrayList;
import model.User;

public class TestUserCRUD {
    
    public static UserDaoImpl userDaoImpl = new UserDaoImpl();
    
    public static void main(String[] args) {
        User user = new User(1, "Davestring", "string");
        updateUser(user, "password");
    }
    
    public static void createUser(User user) {
        userDaoImpl.create(user);
    }
    
    public static void updateUser(User user, String password) {
        user.setPassword(password);
        userDaoImpl.update(user);
    }
    
    public static void deleteUser(Integer id) {
        userDaoImpl.delete(id);
    }
    
    public static void findUserById(Integer id) {
        User user = userDaoImpl.findById(id);
        System.out.println("Find by id: " + user.toString());
    }
    
    public static void findUserByUsername(String username) {
        User user = userDaoImpl.findByUsername(username);
        System.out.println("Find by username: " + user.toString());
    }
    
    public static void findUserByUsernameAndPassword(String username, String password) {
        User user = userDaoImpl.findByUsernameAndPassword(username, password);
        System.out.println("Find by username and password: " + user.toString());
    }
    
    public static void findAllUsers() {
        ArrayList<User> users = userDaoImpl.findAll();
        System.out.println("Find all users:");
        for(User user : users) {
            System.out.println("\t- " + user.toString());
        }
    }

}