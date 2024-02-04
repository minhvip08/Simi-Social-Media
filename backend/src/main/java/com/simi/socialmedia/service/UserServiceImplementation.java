package com.simi.socialmedia.service;

import com.simi.socialmedia.config.JwtProvider;
import com.simi.socialmedia.exception.UserException;
import com.simi.socialmedia.model.User;
import com.simi.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService{
    @Autowired
    UserRepository userRepository;
    @Override
    public User register(User user) {
        User newUser = userRepository.save(user);
        return newUser;
    }

    @Override
    public User findUserById(Integer id) throws UserException {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            throw new UserException("User not found");
        }
        User user = optionalUser.get();
        return user;
    }

    @Override
    public User findUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    public User followUser(Integer userId, Integer followerId) throws UserException {
        User user1 = findUserById(userId);
        User user2 = findUserById(followerId);
        user1.getFollowers().add(user2);
        user2.getFollowings().add(user1);
        userRepository.save(user1);
        userRepository.save(user2);
        return user1;

    }

    @Override
    public User updateUser(Integer userId, User user) throws UserException {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<User> optionalUser1 = userRepository.findById(user.getId());
        if (optionalUser.isEmpty()) {
            throw new UserException("User not found");
        }
        User user1 = optionalUser.get();
        if (user.getFirstName() != null)
            user1.setFirstName(user.getFirstName());
        if (user.getLastName() != null)
            user1.setLastName(user.getLastName());
        if (user.getEmail() != null)
            user1.setEmail(user.getEmail());
        if (user.getPassword() != null)
            user1.setPassword(user.getPassword());
        if (user.getGender() != null)
            user1.setGender(user.getGender());

        System.out.println(user1);

        return userRepository.save(user1);
    }

    @Override
    public List<User> searchUser(String query) {
        List<User> users = userRepository.searchUser(query);
        return users;
    }

    @Override
    public User findUserByJwt(String jwt) throws UserException {
        String email = JwtProvider.getEmailFromJwtToken(jwt);

        User user = findUserByEmail(email);

        return user;
    }
}
