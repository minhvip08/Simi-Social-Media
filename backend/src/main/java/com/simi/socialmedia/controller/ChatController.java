package com.simi.socialmedia.controller;

import com.simi.socialmedia.model.Chat;
import com.simi.socialmedia.model.User;
import com.simi.socialmedia.request.CreateChatRequest;
import com.simi.socialmedia.service.ChatService;
import com.simi.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChatController {
    @Autowired
    private ChatService chatService;
    @Autowired
    private UserService userService;


    @PostMapping("/api/chats")
    public Chat createChat(@RequestHeader("Authorization") String jwt,
            @RequestBody CreateChatRequest req) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        User user2 = userService.findUserById(req.getUser2Id());
        return chatService.createChat(reqUser, user2);
    }


    @GetMapping("/api/chats")
    public List<Chat> findChatsByUserId(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        return chatService.findChatsByUserId(user.getId());
    }

}
