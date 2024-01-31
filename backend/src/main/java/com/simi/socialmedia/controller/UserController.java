package com.simi.socialmedia.controller;

import com.simi.socialmedia.model.User;
import com.simi.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    UserRepository userRepository;

    /**
     *
     */
    @GetMapping("/users")
    public List<User> getUser() {
        return userRepository.findAll();
    }

    @PostMapping("/users")
    public User createUser(@RequestBody  User user) {
        return userRepository.save(user);

    }

    @GetMapping("users/{userId}")
    public User getUserById(@PathVariable("userId") Integer userId) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.orElse(null);
    }

    @PutMapping("users/{userId}")
    public User updateUser(@PathVariable("userId") Integer userId, @RequestBody User user) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);
        User user1 = optionalUser.orElseThrow(() -> new Exception("User not found"));
        if (user.getFirstName() != null)
            user1.setFirstName(user.getFirstName());
        if (user.getLastName() != null)
            user1.setLastName(user.getLastName());
        if (user.getEmail() != null)
            user1.setEmail(user.getEmail());
        if (user.getPassword() != null)
            user1.setPassword(user.getPassword());

        System.out.println(user1);

        return userRepository.save(user1);
    }

    @DeleteMapping("users/{userId}")
    public String deleteUser(@PathVariable("userId") Integer userId) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(() -> new Exception("User not found"));
        userRepository.delete(user);
        return "User deleted successfully";
    }

}
