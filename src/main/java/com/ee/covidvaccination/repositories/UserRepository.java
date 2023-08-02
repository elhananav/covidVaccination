package com.ee.covidvaccination.repositories;

import com.ee.covidvaccination.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByDateOfBirthBetween(LocalDate startDate, LocalDate endDate);

    List<User> findByCityContainingIgnoreCase(String city);
}
