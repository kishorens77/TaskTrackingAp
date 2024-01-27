package com.tasktracking.taskservice.service;

import com.tasktracking.taskservice.models.Task;
import com.tasktracking.taskservice.repository.TaskRepository;
import jakarta.transaction.Transactional;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }
    public List<Task> getTasksByUserId(String user_id) {
        return taskRepository.findByUserId(user_id);
    }

    @Transactional
    public void deleteTaskById(Long taskId) {
        try {
            taskRepository.dropByTaskId(taskId);
        } catch (EmptyResultDataAccessException e) {
            throw new ServiceException("Task not found with ID: " + taskId);
        }
    }

    @Transactional
   public void updateTask(Long task_id,String title,String description,Date deadline,
                          Date created_on,String status,String user_id){
       try{
           taskRepository.updateByTaskId(task_id,title,description,deadline,created_on,status,user_id);
       } catch (EmptyResultDataAccessException e) {
           throw new ServiceException("Task not found with ID: " + task_id);
       }
   }

   @Scheduled(cron = "0 0 0 * * *")
   public void updateOverdue(){
        taskRepository.disableSafeUpdates();
        taskRepository.updateOverdueStatus();
   }

}
