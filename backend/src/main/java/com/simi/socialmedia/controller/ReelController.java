package com.simi.socialmedia.controller;

import com.simi.socialmedia.model.Reel;
import com.simi.socialmedia.model.User;
import com.simi.socialmedia.service.ReelService;
import com.simi.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReelController {
    @Autowired
    private ReelService reelService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/reels")
    public Reel createReel(@RequestBody Reel reel,
                           @RequestHeader("Authorization") String jwt) throws Exception {
        Reel newReel = new Reel();
        User user = userService.findUserByJwt(jwt);
        newReel.setUser(user);
        newReel.setTitle(reel.getTitle());
        newReel.setVideo(reel.getVideo());
        return reelService.createReel(newReel, user);
    }

    @GetMapping("/api/reels")
    public List<Reel> findAllReels() throws Exception {
        return reelService.findAllReels();
    }

    @GetMapping("/api/reels/user/{userId}")
    public List<Reel> findReelsByUserId(@PathVariable Integer userId) throws Exception {
        return reelService.findReelsByUserId(userId);
    }



}
