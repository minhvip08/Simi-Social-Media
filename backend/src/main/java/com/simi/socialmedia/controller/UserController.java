package com.simi.socialmedia.controller;

import com.simi.socialmedia.exception.UserException;
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



    @GetMapping("/api/users/{userId}")
    public User getUserById(@PathVariable("userId") Integer userId) throws UserException {
        User user = userService.findUserById(userId);
        return user;
    }

    @PutMapping("/api/users")
    public User updateUser(@RequestHeader("Authorization") String jwt, @RequestBody User user) throws UserException {
        User reqUser = userService.findUserByJwt(jwt);
        return userService.updateUser(reqUser.getId(), user);
    }

    @DeleteMapping("/api/users/{userId}")
    public String deleteUser(@PathVariable("userId") Integer userId) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);
        User user = optionalUser.orElseThrow(() -> new Exception("User not found"));
        userRepository.delete(user);
        return "User deleted successfully";
    }

    @PutMapping("/api/users/follow/{followerId}")
    public User followUserHandler(@RequestHeader("Authorization") String jwt, @PathVariable("followerId") Integer followerId) throws UserException {
        User reqUser = userService.findUserByJwt(jwt);
        return userService.followUser(reqUser.getId(), followerId);
    }

    @GetMapping("/api/users/search")
    public List<User> searchUserHandler(@RequestParam("query") String query) {
        return userService.searchUser(query);
    }

    @GetMapping("/api/users/profile")

    public User getUserFromToken(@RequestHeader("Authorization") String token) throws Exception {

        System.out.println("Token: " + token);
        User user = userService.findUserByJwt(token);
//        System.out.println(user);
        user.setPassword(null);
        return user;
    }

}
