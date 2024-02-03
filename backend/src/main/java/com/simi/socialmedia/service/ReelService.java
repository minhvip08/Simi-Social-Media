package com.simi.socialmedia.service;

import com.simi.socialmedia.model.Reel;
import com.simi.socialmedia.model.User;

import java.util.List;

public interface ReelService {
    public Reel createReel(Reel reel, User user) throws Exception;
    public List<Reel> findAllReels() throws Exception;
    public List<Reel> findReelsByUserId(Integer userId) throws Exception;
}
