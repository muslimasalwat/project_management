package Midsemproject.demo.Manager;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/managers")

public class ManagerController {

    @GetMapping
    public List<Manager> getAllManagers() {
        List<Manager> managers = Arrays.asList(
                new Manager(
                        2200042635L,
                        "Muslima Salwat",
                        "muslimasalwat@gmail.com",
                        "0583923845",
                        "Female")
        );
        return managers;
    }
}