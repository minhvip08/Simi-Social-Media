package com.simi.socialmedia.service;

import com.simi.socialmedia.model.Chat;
import com.simi.socialmedia.model.Message;
import com.simi.socialmedia.model.User;

import java.util.List;

public interface MessageService {
    public Message createMessage(User user, Integer chatId, Message req) throws Exception;
    public List<Message> findChatMessages(Integer chatId);
    public Message findMessageById(Integer messageId);

}
