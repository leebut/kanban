import { useState } from "react";
// import { crypto } from "crypto";

import "./styles.css";

const jobs = [
  {
    id: 1,
    title: "App story",
    desc: "Write out a story for the app.",
  },
  {
    id: 2,
    title: "Wireframe",
    desc: "Design the wireframe for the app.",
  },
  {
    id: 3,
    title: "Code Outline",
    desc: "Code the outline structure (components).",
  },
];

export default function App() {
  const [tasks, setTasks] = useState(jobs);
  const [doingTask, setDoingTask] = useState([]);
  const [doneTask, setDoneTask] = useState([]);

  function handleAddJob(task) {
    console.log("ADD JOB");

    setTasks((tasks) => [...tasks, task]);
  }

  function handleClickedTask(curTask) {
    const newTasks = tasks.filter((tasks) => curTask.id !== tasks.id);
    setDoingTask((doingTask) => [...doingTask, curTask]);
    setTasks(newTasks);
  }

  function handleDoneTask(curTask) {
    const newTasks = doingTask.filter(
      (doingTask) => curTask.id !== doingTask.id
    );
    setDoneTask((doneTask) => [...doneTask, curTask]);
    setDoingTask(newTasks);
  }

  return (
    <>
      <div className="header">
        <AddJob onHandleAddJob={handleAddJob} />
      </div>
      <div className="wrapper">
        <ToDo tasks={tasks} onHandleClickedTask={handleClickedTask} />
        <Doing doingTask={doingTask} onHandleDoneTask={handleDoneTask} />
        <Done doneTask={doneTask} />
      </div>
    </>
  );
}

function AddJob({ onHandleAddJob }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !desc) return;

    const id = crypto.randomUUID();
    const newJob = {
      id,
      desc,
      title,
    };
    onHandleAddJob(newJob);

    setDesc("");
    setTitle("");
  }

  return (
    <>
      <div>
        <h2 className="list-title">Add a new job</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="title">Job Name</label>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="desc">Job Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />

          <Button>Add New Job</Button>
        </form>
      </div>
    </>
  );
}

function ToDo({ tasks, onHandleClickedTask }) {
  return (
    <>
      <div>
        <h2 className="list-title">Job queue</h2>

        {tasks.length === 0 && <h2>No orders</h2>}
        <ul className="kanban-card queue">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onHandleClickedTask={onHandleClickedTask}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

function TaskItem({ task, onHandleClickedTask }) {
  return (
    <KanBanCardItem task={task}>
      <Button onClick={() => onHandleClickedTask(task)}>Start Job</Button>
    </KanBanCardItem>
  );
}

function Doing({ doingTask, onHandleDoneTask }) {
  return (
    <>
      <div>
        <h2 className="list-title">In Progress</h2>
        {doingTask.length === 0 && <h2>No jobs</h2>}
        <ul className="kanban-card in-progress">
          {doingTask.map((task) => (
            <DoingTaskItem
              key={task.id}
              task={task}
              onHandleDoneTask={onHandleDoneTask}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
function DoingTaskItem({ task, onHandleDoneTask }) {
  return (
    <KanBanCardItem task={task}>
      <Button onClick={() => onHandleDoneTask(task)}>Complete Task</Button>
    </KanBanCardItem>
  );
}

function Done({ doneTask }) {
  return (
    <>
      <div>
        <h2 className="list-title">Completed</h2>
        {doneTask.length === 0 && <h2>No jobs</h2>}
        <ul className="kanban-card done">
          {doneTask.map((task) => (
            <DoneTaskItem key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </>
  );
}

function DoneTaskItem({ task }) {
  return <KanBanCardItem task={task} />;
}

function Button({ children, onClick }) {
  return (
    <>
      <button className="btn" onClick={onClick}>
        {children}
      </button>
    </>
  );
}

function KanBanCardItem({ task, children }) {
  return (
    <>
      <li className="kanban-card__item">
        <p className="kanban-card__heading">Title: {task.title}</p>
        <div className="kanban-card__body">
          <p>{task.desc}</p>
          {children}
        </div>
      </li>
    </>
  );
}
