import React from 'react';
import Navigationbar from '../navbar/Navigationbar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTasks } from '../../service/TaskService';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { VictoryPie, VictoryBar, VictoryAxis, VictoryChart } from 'victory';
import './Home.css'



function Home({ handleLogout, isLoggedIn, token }) {
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getTasks(id, token)
      .then(jsonData => {
        setTasks(jsonData);
      })
  }, [id,token]);

  if (tasks.status === 500) {
    setTasks([]);
  }

  const pendingCount = tasks.reduce((count, task) => task.status === 'pending' ? count + 1 : count, 0);
  const completedCount = tasks.reduce((count, task) => task.status === 'completed' ? count + 1 : count, 0);
  const overdueCount = tasks.reduce((count, task) => task.status === 'overdue' ? count + 1 : count, 0);

  const tasksByMonth = tasks.reduce((countByMonth, task) => {
    const deadlineMonth = new Date(task.deadline).getMonth() + 1;
    countByMonth[deadlineMonth] = (countByMonth[deadlineMonth] || 0) + 1;
    return countByMonth;
  }, {});

  const data2 = Object.keys(tasksByMonth).map(month => ({
    x: new Date(0, parseInt(month) - 1).toLocaleString('default', { month: 'short' }),
    y: tasksByMonth[month]
  }));


  const data = [
    { x: 'Completed', y: completedCount },
    { x: 'Pending', y: pendingCount },
    { x: 'Overdue', y: overdueCount },
  ];

  return (
    <div className="home-page">
      <div><Navigationbar handleLogout={handleLogout}/></div>
      <h1 className="home-title">Welcome home</h1>
      <h2 className="activity-title">Your Activity</h2>
      <Container>
        <Row>
          <Col>
            <div className="pie-chart">
              <VictoryPie
                data={data}
                colorScale={['green', 'yellow', 'red']}
              />
            </div>
            <div className="chart-title">Tasks by Type</div>
          </Col>
          <Col>
            <div className="bar-chart">

              <VictoryChart domainPadding={{ x: [20, 0] }}
                padding={{ top: 50, bottom: 50, left: 80, right: 20 }}>

                <VictoryAxis
                  tickValues={data2.map(d => d.x)}
                  tickFormat={data2.map(d => d.x)}
                  style={{
                    tickLabels: {
                      fontSize: 10,
                      angle: -45,
                      verticalAnchor: 'middle',
                      textAnchor: 'end'
                    }
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={tick => `${tick}`}
                  style={{
                    tickLabels: {
                      fontSize: 10
                    }
                  }}
                />
                <VictoryBar
                  data={data2}
                  x="x"
                  y="y"
                  style={{
                    data: {
                      width: 15,
                      fill: '#3366cc'
                    }
                  }}
                />
              </VictoryChart>
            </div>
            <div className="chart-title">Tasks by Month</div>
          </Col>
        </Row>
      </Container>


    </div>


  )
}

export default Home