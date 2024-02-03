package com.simi.socialmedia.service;

import com.simi.socialmedia.model.Reel;
import com.simi.socialmedia.model.User;
import com.simi.socialmedia.repository.ReelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReelServiceImplementation implements ReelService{
    @Autowired
    private ReelRepository reelRepository;
    @Autowired
    private UserService userService;

    @Override
    public Reel createReel(Reel reel, User user) throws Exception {
        Reel newReel = new Reel();
        newReel.setUser(user);
        newReel.setTitle(reel.getTitle());
        newReel.setVideo(reel.getVideo());


        return reelRepository.save(newReel) ;
    }

    @Override
    public List<Reel> findAllReels() throws Exception {
        return reelRepository.findAll();
    }

    @Override
    public List<Reel> findReelsByUserId(Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        return reelRepository.findByUserId(user.getId());
    }
}
