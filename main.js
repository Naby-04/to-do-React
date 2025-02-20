const { useState, useEffect } = React; // Importer les hooks de React

function App() {
  const [task, setTask] = useState("");
  const [taskDelay, setTaskDelay] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [tasksDelay, setTasksDelay] = useState([]);
  const [tasksDescription, setTasksDescription] = useState([]);
  const handleChange = (event) => {
    setTask(event.target.value); // Mettre à jour le state en temps réel
  };
  const handleTaskDelayChange = (event) => {
    setTaskDelay(event.target.value); // Mettre à jour le state en temps réel
  };
  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value); // Mettre à jour le state en temps réel
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    if (
      task.trim() !== "" &&
      taskDelay.trim() !== "" &&
      taskDescription.trim() !== ""
    ) {
      setTasks([...tasks, task]); // Ajouter la tâche à la liste
      setTasksDelay([...tasksDelay, taskDelay]); // Ajouter la tâche à la liste
      setTasksDescription([...tasksDescription, taskDescription]); // Ajouter la tâche à la liste
      setTask(""); // Réinitialiser l'input après ajout
      setTaskDelay(""); // Réinitialiser l'input après ajout
      setTaskDescription(""); // Réinitialiser l'input après ajout
    }
  };

  // Afficher les tâches mises à jour
  useEffect(() => {
    console.table(tasks);
    console.table(tasksDelay);
    console.table(tasksDescription);
  }, [tasks]);
  return (
    <div>
      <div className="form-control w-50 col-12 col-md-6 mx-auto d-flex mt-5">
        <input
          type="text"
          className="form-control rounded"
          placeholder="Add item"
          name="Add item"
          required
          disabled
        />
        {/* Button trigger modal  */}
        <button
          type="button"
          className="btn btn-active"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
        {/* Modal */}
        <div
          className="modal fade w-100"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="false"
        >
          <div className="modal-dialog w-100 modal-dialog-centered">
            <div className="modal-content w-100">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add your task's information
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="row p-0">
                  <div className="form-control mb-3 col-12 col-md-6">
                    <label htmlFor="taskName" className="w-50 mb-2">
                      Name your task
                    </label>
                    <input
                      type="text"
                      className="form-control p-3"
                      id="taskName"
                      value={task}
                      onChange={handleChange}
                      placeholder="Name"
                      name="prenom"
                      required
                    />
                  </div>
                  <div className="form-control mb-3 col-12 col-md-6">
                    <label htmlFor="taskDelay" className="mb-2 w-50">
                      Task Delay
                    </label>
                    <input
                      type="date"
                      className="form-control p-3"
                      id="taskDelay"
                      value={taskDelay}
                      onChange={handleTaskDelayChange}
                      placeholder="Nom"
                      name="delay"
                      required
                    />
                  </div>
                  <div className="form-control mb-3 col-12 col-md-6">
                    <label htmlFor="TaskDescription" className="w-100 mb-2">
                      Task Description
                    </label>
                    <textarea
                      className="w-100 p-2"
                      id="TaskDescription"
                      value={taskDescription}
                      onChange={handleTaskDescriptionChange}
                      name="taskDescription"
                      required
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      id="addbtn"
                      onClick={handleSubmit}
                      className="w-100"
                      type="submit"
                      data-bs-dismiss="modal"
                    >
                      Ajouter
                    </button>
                    <button
                      type="button"
                      id="edit"
                      className="w-100"
                      data-bs-dismiss="modal"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* affichage de la liste des taches */}
      <div className="container user-part">
        <h2 className="text-center mt-5 mx-auto pb-2">List of tasks</h2>
        <table className="affichage_tableau mt-3">
          <thead>
            <tr>
              <th>Task</th>
              <th>Task details</th>
              <th>Delay</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {/* Les lignes de données vont être insérées ici par JavaScript  */}
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task}</td>
                <td>{tasksDescription[index]}</td>
                <td>{tasksDelay[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Affichage du composant dans un élément HTML avec l'id "root"
ReactDOM.render(<App />, document.getElementById("root"));
