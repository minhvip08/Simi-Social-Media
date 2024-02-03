package com.simi.socialmedia.controller;

import com.simi.socialmedia.model.Story;
import com.simi.socialmedia.model.User;
import com.simi.socialmedia.service.StoryService;
import com.simi.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class StoryController {
    @Autowired
    private StoryService storyService;
    @Autowired
    private UserService userService;

    @PostMapping("/api/story")
    public Story createStory(
            @RequestBody Story story, @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwt(jwt);
        Story newStory = storyService.createStory(story, user);
        return storyService.createStory(newStory, user);
    }

    @GetMapping("/api/story/user/{userId}")
    public List<Story> findStoriesByUserId(@PathVariable Integer userId) throws Exception {
        return storyService.findStoriesByUserId(userId);
    }
}
