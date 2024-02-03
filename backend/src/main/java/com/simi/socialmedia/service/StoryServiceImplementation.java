package com.simi.socialmedia.service;

import com.simi.socialmedia.model.Story;
import com.simi.socialmedia.model.User;
import com.simi.socialmedia.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryServiceImplementation implements StoryService{
    @Autowired
    private StoryRepository storyRepository;
    @Autowired
    private UserService userService;
    @Override
    public Story createStory(Story story, User user) throws Exception {
        Story newStory = new Story();
        newStory.setUser(user);
        newStory.setCaption(story.getCaption());
        newStory.setImage(story.getImage());
        newStory.setTimestamp(LocalDateTime.now());
        return storyRepository.save(newStory);
    }

    @Override
    public List<Story> findAllStories() throws Exception {
        return storyRepository.findAll();
    }

    @Override
    public List<Story> findStoriesByUserId(Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        return storyRepository.findByUserId(user.getId());

    }
}
