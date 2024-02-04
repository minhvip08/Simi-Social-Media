package com.simi.socialmedia.service;

import com.simi.socialmedia.model.Chat;
import com.simi.socialmedia.model.User;

import java.util.List;

public interface ChatService {
    public Chat createChat(User reqUser, User user2) throws Exception;
    public Chat findChatById(Integer chatId) throws Exception;
    public List<Chat> findChatsByUserId(Integer userId) throws Exception;
}
