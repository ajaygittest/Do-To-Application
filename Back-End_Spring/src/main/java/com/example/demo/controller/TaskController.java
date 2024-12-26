package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Task;
import com.example.demo.repository.TaskRepository;

@RestController
@CrossOrigin
@RequestMapping("api/tasks")
public class TaskController {
	
	
	@Autowired
	private TaskRepository repo;
	
	@GetMapping("/hello-world")
	public String helloWorld() {
		return "Hello World";
	}
	
	@PostMapping
	public Task createTask(@RequestBody Task task) {
		repo.save(task);
		return task;
	}
	
	@GetMapping
	public List<Task> getAllTask() {
		return repo.findAll();
	}
	
	@PutMapping("/{id}")
	public Task updateTask(@PathVariable Long id,@RequestBody Task task) {
		task.setId(id);
		repo.save(task);
		return task;
		
	}
	
	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable Long id) {
		repo.deleteById(id);
		
	}

}
