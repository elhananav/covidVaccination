package com.ee.covidvaccination.services;

import com.ee.covidvaccination.entity.User;
import com.ee.covidvaccination.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User addUser(User user) {
        User saved = userRepository.save(user);
        return saved;
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.get();
    }

    @Override
    public List<User> getUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

    @Override
    public List<User> getUsersBetweenDates(LocalDate startDate, LocalDate endDate) {
        List<User> users = userRepository.findByDateOfBirthBetween(startDate, endDate);
        return users;
    }

    @Override
    public List<User> getUsersByCity(String city) {
        List<User> users = userRepository.findByCityContainingIgnoreCase(city);
        return users;
    }
}
