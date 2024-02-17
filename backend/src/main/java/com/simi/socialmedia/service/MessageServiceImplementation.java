package com.simi.socialmedia.service;

import com.simi.socialmedia.model.Chat;
import com.simi.socialmedia.model.Message;
import com.simi.socialmedia.model.User;
import com.simi.socialmedia.repository.ChatRepository;
import com.simi.socialmedia.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageServiceImplementation implements MessageService{
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatRepository chatRepository;


    @Override
    public Message createMessage(User user, Integer chatId, Message req) throws Exception {
        Message message = new Message();
        Chat chat = chatService.findChatById(chatId);

        message.setChat(chat);
        message.setContent(req.getContent());
        message.setTimestamp(LocalDateTime.now());
        message.setUser(user);
        message.setImage(req.getImage());

        Message newMessage = messageRepository.save(message);
        chat.getMessages().add(message);
        Chat newChat = chatRepository.save(chat);
        System.out.println("Chat:"+newChat.getMessages().size());
        return newMessage;
    }

    @Override
    public List<Message> findChatMessages(Integer chatId) {
        return messageRepository.findByChatId(chatId);
    }

    @Override
    public Message findMessageById(Integer messageId) {
        Optional<Message> message = messageRepository.findById(messageId);
        return message.orElse(null);
    }
}
