import React from 'react'
import './home.css';
import { LuCalendar } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { PiCalendarBlankBold } from "react-icons/pi";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
function Homeui() {

  const tasks = [
    {
      id: 1,
      title: 'Work out',
      time: '8:00 am',
      category: 'personal',
      completed: true,
    },
    {
      id: 2,
      title: 'Design team meeting',
      time: '2:30 pm',
      category: 'work',
      completed: false,
    },
    {
      id: 3,
      title: 'Hand off the project',
      time: '7:00 pm',
      category: 'freelance',
      completed: false,
    },
    {
      id: 4,
      title: 'Read 5 pages of “sprint”',
      time: '10:30 pm',
      category: 'personal',
      completed: false,
    },
  ];

  const categoryColors = {
    personal: '#FF6B81',
    freelance: '#00C2FF',
    work: '#FFD93D',
  };


  return (
    <div className='app-container-main'>
      <div className="circle-box-1 top-circle"></div>
      <div className="circle-box-2 right-middle-circle"></div>
      <div className="circle-box-3 left-bottom-circle"></div>
      <div className="app-container">
        <aside className="sidebar">
          <div>
            <div className="user">
              <img src="https://i.pravatar.cc/40" alt="user" />
              <div className="user-info">
                <h5>Do-it</h5>
                <p className="username">Hamza mameri</p>
              </div>

            </div>
            <hr className='hr-line'></hr>
          </div>
          <nav>
            <p className="dot-tage-personal">
              <span className="icon" style={{ paddingRight: "20px" }}><LuCalendar />
              </span>Today tasks</p>
            <ul>
              <li><span className="dot personal"></span> Personal</li>
              <li><span className="dot freelance"></span> Freelance</li>
              <li><span className="dot work"></span> Work</li>
              <li className="disabled">+ Add filter</li>
            </ul>
          </nav>
          <p className="dot-tage-personal">
            <span className="icon icon-schedule"><RiCalendarScheduleLine />
            </span>Scheduled tasks</p>
          <p className="dot-tage-personal">
            <span className="icon icon-schedule"><IoSettingsOutline />
            </span>Settings</p>
        </aside>

        <main className="main-panel">
          <div className='main-panel-header'>
            <h2>Today main focus</h2>
            <h3 className="highlight">Design team meeting</h3>
          </div>

          <div className="task-input">
            <div className="dot-group">
              <span className="dot personal"></span>
              <span className="dot freelance"></span>
              <span className="dot work"></span>
            </div>
            <input type="text" placeholder="What is your next task?" />
            <button className="time-button">
              <span className="icon icon-schedule"><MdOutlineWatchLater /></span>
              <span className="icon icon-schedule" style={{ paddingLeft: "15px" }}><PiCalendarBlankBold /></span>
            </button>
          </div>

          <div className="task-list">
            {tasks.map((task) => (
              <div className="task-item" key={task.id}>
                <span className="dot" style={{ backgroundColor: categoryColors[task.category] }}></span>
                <span className="task-title">{task.title}</span>
                <span className="task-time">{task.time}</span>
                {task.completed ? <span className="check"><FaRegCheckCircle /></span> : <span className="circle"></span>}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Homeui
