package com.ee.covidvaccination.controller;

import com.ee.covidvaccination.entity.User;
import com.ee.covidvaccination.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class Controller {

    private final UserService userService;

    @PostMapping()
    public ResponseEntity<User> addUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/betweenDates")
    public ResponseEntity<List<User>> getUsersBetweenDates(@RequestParam LocalDate startDate,
                                                           @RequestParam LocalDate endDate) {
        return new ResponseEntity<>(userService.getUsersBetweenDates(startDate, endDate), HttpStatus.OK);
    }

    @GetMapping("/byCity/{city}")
    public ResponseEntity<List<User>> getUsersByCity(@PathVariable("city") String city) {
        return new ResponseEntity<>(userService.getUsersByCity(city), HttpStatus.OK);
    }
}
