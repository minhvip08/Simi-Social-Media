package com.simi.socialmedia.service;

import com.simi.socialmedia.model.Story;
import com.simi.socialmedia.model.User;

import java.util.List;

public interface StoryService {
    public Story createStory(Story story, User user) throws Exception;
    public List<Story> findAllStories() throws Exception;
    public List<Story> findStoriesByUserId(Integer userId) throws Exception;
}
