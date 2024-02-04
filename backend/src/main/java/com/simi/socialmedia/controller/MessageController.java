package com.simi.socialmedia.controller;

import com.simi.socialmedia.model.Message;
import com.simi.socialmedia.service.MessageService;
import com.simi.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/chats/{chatId}/messages")
    public Message createMessage(@RequestHeader("Authorization") String jwt,
                                 @PathVariable Integer chatId,
                                 @RequestBody Message req) throws Exception {

        return messageService.createMessage(userService.findUserByJwt(jwt), chatId, req);
    }

    @GetMapping("/api/chats/{chatId}/messages")
    public List<Message> findChatMessages(@PathVariable Integer chatId) {
        return messageService.findChatMessages(chatId);
    }
}
