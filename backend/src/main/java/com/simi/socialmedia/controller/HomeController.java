package com.simi.socialmedia.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String homeControllerHandler() {
        return "This is home controller!";
    }

//    @DeleteMapping("/")
//    public String deleteHandler() {
//        return "This is delete handler!";
//    }

    @GetMapping("/home")
    public String homeHandler() {
        return "This is home handler!";
    }
}

