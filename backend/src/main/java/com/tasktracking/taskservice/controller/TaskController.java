package com.tasktracking.taskservice.controller;

import com.tasktracking.taskservice.service.TaskService;
import com.tasktracking.taskservice.models.Task;
import netscape.javascript.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;
    @Autowired
    private JwtDecoder jwtDecoder;

    @PostMapping
    public ResponseEntity<Task> saveTask(@RequestBody Task task, @RequestHeader("Authorization") String token) {
        System.out.println(task.toString());
        String jwtToken = token.replace("Bearer ", "");
        Jwt decodedToken = jwtDecoder.decode(jwtToken);

        if (decodedToken == null) {
            return ResponseEntity.status(401).build();
        }

        Task savedTask = taskService.saveTask(task);
        if (savedTask != null) {
            return ResponseEntity.ok(savedTask);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/users/{user_id}")
    public ResponseEntity<List<Task>> getTasksByUserId(@PathVariable("user_id") String user_id, @RequestHeader("Authorization") String token) {

        String jwtToken = token.replace("Bearer ", "");
        Jwt decodedToken = jwtDecoder.decode(jwtToken);

        if (decodedToken == null) {
            return ResponseEntity.status(401).build();
        }

        List<Task> tasks = taskService.getTasksByUserId(user_id);
        if (tasks.isEmpty()) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("/{task_id}")
    public ResponseEntity<?> deleteTaskByTaskId(@PathVariable("task_id") Long task_id, @RequestHeader("Authorization") String token) {
        String jwtToken = token.replace("Bearer ", "");
        Jwt decodedToken = jwtDecoder.decode(jwtToken);

        if (decodedToken == null) {
            return ResponseEntity.status(401).build();
        }

        taskService.deleteTaskById(task_id);
        return ResponseEntity.status(204).build();
    }

    @PutMapping("/{task_id}")
    public ResponseEntity<?> updateTaskDeadline(@PathVariable Long task_id, @RequestBody Task task, @RequestHeader("Authorization") String token) {
        System.out.println("TASK RECEIVED: "+task);
        String jwtToken = token.replace("Bearer ", "");
        Jwt decodedToken = jwtDecoder.decode(jwtToken);

        if (decodedToken == null) {
            return ResponseEntity.status(401).build();
        }

        taskService.updateTask(task_id, task.getTitle(), task.getDescription(),
                task.getDeadline(), task.getCreated_on(), task.getStatus(), task.getUser_id());
        return ResponseEntity.ok("Success");
    }


}
