package com.simi.socialmedia.controller;

import com.simi.socialmedia.model.User;
import com.simi.socialmedia.repository.UserRepository;
import com.simi.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    /**
     *
     */
    @GetMapping("/users")
    public List<User> getUser() {
        return userRepository.findAll();
    }

    @PostMapping("/users")
    public User createUser(@RequestBody  User user) {
        User newUser = userService.register(user);
        return newUser;

    }

    @GetMapping("users/{userId}")
    public User getUserById(@PathVariable("userId") Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        return user;
    }

    @PutMapping("users/{userId}")
    public User updateUser(@PathVariable("userId") Integer userId, @RequestBody User user) throws Exception {
        return userService.updateUser(userId, user);
    }

    @DeleteMapping("users/{userId}")
    public String deleteUser(@PathVariable("userId") Integer userId) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(() -> new Exception("User not found"));
        userRepository.delete(user);
        return "User deleted successfully";
    }

    @PutMapping("users/follow/{userId}/{followerId}")
    public User followUserHandler(@PathVariable("userId") Integer userId, @PathVariable("followerId") Integer followerId) throws Exception {
        return userService.followUser(userId, followerId);
    }

    @GetMapping("users/search")
    public List<User> searchUserHandler(@RequestParam("query") String query) {
        return userService.searchUser(query);
    }



}
