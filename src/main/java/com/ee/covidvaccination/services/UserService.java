package com.ee.covidvaccination.services;

import com.ee.covidvaccination.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface UserService {

    User addUser(User user);

    User getUserById(Long id);

    List<User> getUsers();

    List<User> getUsersBetweenDates(LocalDate startDate, LocalDate endDate);

    List<User> getUsersByCity(String city);
}
