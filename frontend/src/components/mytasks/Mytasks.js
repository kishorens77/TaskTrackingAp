import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import Navigationbar from '../navbar/Navigationbar';
import './Mytasks.css'
import Button from 'react-bootstrap/Button';
import { getTasks, putTask, deleteTask, addTask } from '../../service/TaskService';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";



function Mytasks({ handleLogout, isLoggedIn, token }) {
  const currentDate = new Date().toISOString().split('T')[0];

  const [tasks, setTasks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getTasks(id, token)
      .then(jsonData => {
        setTasks(jsonData);
      })
      
  }, [id,token]);

  function statusChange(id) {
    const updatedTask = tasks.find(task => task.task_id === id);

    if (updatedTask) {
      updatedTask.status = 'completed';
      updatedTask.deadline= currentDate;
      console.log("updated", updatedTask);
      putTask(updatedTask.task_id, updatedTask, token)
        .then(response => {
          console.log(response);
          const updatedTasks = tasks.map(task => {
            if (task.task_id === id) {
              return updatedTask;
            }
            return task;
          });
          setTasks(updatedTasks);
        })
        .catch(error => {
          console.log("Error occurred while updating the task status: ", error);
        });
    }
  }

  function deleteEvent(id) {

    deleteTask(id, token)
      .then(() => {
        const updatedTasks = tasks.filter(task => task.task_id !== id);
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.log("Error occurred while deleting this task:", error);
      });
  }

  function AddTask() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [taskData, setTaskData] = useState({
      title: '',
      description: '',
      created_on: currentDate,
      deadline: '',
      status: 'pending',
      user_id: id
    });

    function handleInputChange(event) {
      const { name, value } = event.target;
      setTaskData({ ...taskData, [name]: value });
    }


    async function handleTaskSubmit(event) {
      event.preventDefault();

      if (taskData.title.trim() === '' || taskData.description.trim() === '' || taskData.deadline === '') {
        return;
      }
      try {
        const newtask = await addTask(taskData, token);
        setTasks(prevtasks => [...prevtasks, newtask]);
        handleClose();
        setTaskData({
          title: '',
          description: '',
          created_on: currentDate,
          deadline: '',
          status: 'pending',
          user_id: id
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (tasks.status ===500 ) {
      setTasks([]);
    }

    return (
      <>
        <Button variant="info" onClick={handleShow} className="add-task-button">
          Add a new Task
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="task-form-modal">
              <Form className="task-form">
                <Row>
                  <Form.Group className="mb-3" controlId="tasktitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter task title" name="title"
                      value={taskData.title} onChange={handleInputChange}
                      required />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-3" controlId="taskdescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="description" name="description"
                      onChange={handleInputChange} value={taskData.description} required />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-3" controlId="taskdeadline">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control type="date" placeholder="deadline" name="deadline"
                      onChange={handleInputChange} value={taskData.deadline}
                      min={currentDate} required />
                  </Form.Group>
                </Row>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="info" onClick={handleTaskSubmit}>Add</Button>

          </Modal.Footer>
        </Modal >
      </>
    );
  }


  return (
    <div className="task-page">
      <div><Navigationbar handleLogout={handleLogout} /></div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="title-head" colSpan="4">Title and Description</th>
              <th colSpan="1">Status</th>
              <th colspan="1">Started On</th>
              <th colspan="1">Deadline/Fin.On</th>
              <th colspan="1">Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              tasks.status  === 500 ? ( 
                <tr>
                  <td colSpan="4">No tasks available</td>
                </tr>
              ) : tasks.map((task) => (
                <tr key={task.task_id}>
                  <td colSpan="4">
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey={task.task_id}>
                        <Accordion.Header className={task.status}>{task.title}</Accordion.Header>
                        <Accordion.Body>{task.description}</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </td>
                  <td className={task.status} colSpan="1">
                    {task.status}
                    {task.status === 'pending' || task.status === 'overdue' ? (
                      <div>
                        <Button className="status-button" variant="success" onClick={() => statusChange(task.task_id)}>Complete</Button>
                      </div>
                    ) : null}
                  </td>

                  <td colSpan="1">{new Date(task.created_on).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</td>
                  <td colSpan="1">{new Date(task.deadline).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</td>
                  <td>
                    <Button className="delete-button" variant="danger" onClick={() => deleteEvent(task.task_id)}> X </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
          <div className="add-task-button"><AddTask /></div>
        </table>
      </div>
    </div>
  );
}

export default Mytasks;
