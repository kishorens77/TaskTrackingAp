package com.tasktracking.taskservice.repository;

import com.tasktracking.taskservice.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Integer> {

    @Query("SELECT task FROM Task task WHERE task.user_id = :user_id")
    List<Task> findByUserId(String user_id);

    @Modifying
    @Query("DELETE FROM Task t WHERE t.task_id = :task_id")
    void dropByTaskId(Long task_id);

    @Modifying
    @Query("UPDATE Task t SET t.title = :title, t.description = :description, t.created_on =:created_on," +
            "t.status =:status,t.user_id = :user_id, t.deadline = :deadline WHERE t.task_id = :task_id")
    void updateByTaskId(Long task_id, String title, String description, Date deadline,
                        Date created_on, String status, String user_id);

    @Modifying
    @Query(value = "SET SQL_SAFE_UPDATES = 0;", nativeQuery = true)
    void disableSafeUpdates();
    @Modifying
    @Query(value = "UPDATE tasks SET status = 'overdue' WHERE deadline< current_date()",nativeQuery = true)
    void updateOverdueStatus();





}
