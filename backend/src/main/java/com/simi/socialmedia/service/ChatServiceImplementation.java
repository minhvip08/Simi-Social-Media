package com.simi.socialmedia.service;

import com.simi.socialmedia.model.Chat;
import com.simi.socialmedia.model.User;
import com.simi.socialmedia.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImplementation implements ChatService {
    @Autowired
    private ChatRepository chatRepository;
    @Override
    public Chat createChat(User reqUser, User user2) throws Exception {
        Chat isExist = chatRepository.findChatByUsersId(reqUser, user2);
        if(isExist != null){
            return isExist;
        }
        Chat chat = new Chat();
        chat.getUsers().add(reqUser);
        chat.getUsers().add(user2);
        chat.setTimestamp(LocalDateTime.now());

        return chatRepository.save(chat);
    }

    @Override
    public Chat findChatById(Integer chatId) throws Exception {
        Optional<Chat> chat = chatRepository.findById(chatId);
        if(chat.isPresent()){
            return chat.get();
        }
        else {
            throw new Exception("Chat not found" + chatId);
        }
    }

    @Override
    public List<Chat> findChatsByUserId(Integer userId) throws Exception {
        return chatRepository.findByUsersId(userId);
    }
}
