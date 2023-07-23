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

  // ----------------- H A N D L E  F U N C T I O N S -------------

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

  function handleDeleteTask(curTask, condition) {
    let cond = condition;

    const toDeleteTaskList = tasks.filter((tasks) => curTask.id !== tasks.id);
    const toDeleteDoingTasks = doingTask.filter(
      (doingTasks) => curTask.id !== doingTasks.id
    );
    const toDeleteDoneTasks = doneTask.filter(
      (doneTask) => curTask.id !== doneTask.id
    );

    cond === 1 && setTasks(toDeleteTaskList);
    cond === 2 && setDoingTask(toDeleteDoingTasks);
    cond === 3 && setDoneTask(toDeleteDoneTasks);
  }
  // ----------------------------------------------------------------
  return (
    <>
      <div className="header">
        <AddJob onHandleAddJob={handleAddJob} />
      </div>
      <div className="wrapper">
        <ToDo
          tasks={tasks}
          onHandleClickedTask={handleClickedTask}
          onHandleDeleteTask={handleDeleteTask}
        />
        <Doing
          doingTask={doingTask}
          onHandleDoneTask={handleDoneTask}
          onHandleDeleteTask={handleDeleteTask}
        />
        <Done doneTask={doneTask} onHandleDeleteTask={handleDeleteTask} />
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

          <Button className="btn">Add New Job</Button>
        </form>
      </div>
    </>
  );
}

function ToDo({ tasks, onHandleClickedTask, onHandleDeleteTask }) {
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
              onHandleDeleteTask={onHandleDeleteTask}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

function TaskItem({ task, onHandleClickedTask, onHandleDeleteTask }) {
  return (
    <KanBanCardItem task={task}>
      <Button className="btn" onClick={() => onHandleClickedTask(task)}>
        Start Job
      </Button>
      <Button
        className="btn btn-delete"
        onClick={() => {
          // (1);
          onHandleDeleteTask(task, 1);
        }}
      >
        Delete Job
      </Button>
    </KanBanCardItem>
  );
}

function Doing({ doingTask, onHandleDoneTask, onHandleDeleteTask }) {
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
              onHandleDeleteTask={onHandleDeleteTask}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
function DoingTaskItem({ task, onHandleDoneTask, onHandleDeleteTask }) {
  return (
    <KanBanCardItem task={task}>
      <Button className="btn" onClick={() => onHandleDoneTask(task)}>
        Complete Task
      </Button>
      <Button
        className="btn btn-delete"
        onClick={() => {
          onHandleDeleteTask(task, 2);
        }}
      >
        Delete Job
      </Button>
    </KanBanCardItem>
  );
}

function Done({ doneTask, onHandleDeleteTask }) {
  return (
    <>
      <div>
        <h2 className="list-title">Completed</h2>
        {doneTask.length === 0 && <h2>No jobs</h2>}
        <ul className="kanban-card done">
          {doneTask.map((task) => (
            <DoneTaskItem
              key={task.id}
              task={task}
              onHandleDeleteTask={onHandleDeleteTask}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

function DoneTaskItem({ task, onHandleDeleteTask }) {
  return (
    <>
      <KanBanCardItem task={task}>
        <Button
          className="btn btn-delete"
          onClick={() => {
            onHandleDeleteTask(task, 3);
          }}
        >
          Delete Job
        </Button>
      </KanBanCardItem>
    </>
  );
}

function Button({ children, onClick, className }) {
  return (
    <>
      {/* <button className="btn" onClick={onClick}> */}
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

function KanBanCardItem({ task, children }) {
  return (
    <>
      <li className="kanban-card__item">
        <p className="kanban-card__heading">{task.title}</p>
        <div className="kanban-card__body">
          <p>{task.desc}</p>
          {children}
        </div>
      </li>
    </>
  );
}
