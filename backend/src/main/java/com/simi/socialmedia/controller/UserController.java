package com.simi.socialmedia.controller;

import com.simi.socialmedia.models.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @GetMapping("/users")
    public List<User> getUser() {
        List<User> users = new ArrayList<>();
        User user = new User();
        user.setFirstName("Simi");
        user.setLastName("Adeniyi");
        user.setEmail("minh@gmail.com");
        user.setPassword("123456");
        users.add(user);
        return users;
    }
}
