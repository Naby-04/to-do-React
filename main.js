const { useState, useEffect } = React; // Importer les hooks de React

class App extends React.Component {
  constructor(props) {
    super(props);
    let storedTasks;
    try {
      storedTasks = JSON.parse(localStorage.getItem("tasks"));
    } catch (e) {
      storedTasks = []; // En cas d'erreur, on met un tableau vide
    }
    this.state = {
      task: "", // pour stocker la valeur de l'input};
      tasks: storedTasks || [], // pour stocker la liste des tâches dans le local storage
      // currentEditIndex: null, // Variable globale pour stocker l'index de l'utilisateur en cours de modification
      icone: "fa-solid fa-plus",
      background: "btn btn-active",
      submitType: this.handleSubmit,
      currentIndex: null,
    };
  }

  handleChange = (event) => {
    this.setState({ task: event.target.value }); // Mettre à jour le state en temps réel
  };
  handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    console.log("tasks avant mise à jour:", this.state.tasks);
    // console.table(this.tasks);

    if (this.state.task.trim() !== "") {
      this.setState({
        tasks: [...this.state.tasks, this.state.task],
      });
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks)); // Enregistrer dans le local storage
      // Ajouter la tâche à la liste
      this.setState({ task: "" }); // Réinitialiser l'input après ajout
      this.setState({ icone: "fa-solid fa-plus" });
      this.setState({ background: "btn btn-active" });
    }
  };
  handleCallEdit = (index) => {
    this.setState({ icone: "fa-solid fa-check" });
    this.setState({ background: "btn btn-desactive" });
    this.setState({ submitType: this.handleEdit });
    // passons à l'appel de notre element dans le input
    const taskelement = this.state.tasks[index];
    this.setState({ task: taskelement });
    this.setState({ currentIndex: index });

    //-------------
    console.log(taskelement);
    console.log(index);

    console.log("Boutton modification cliqué !");
  };
  handleEdit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    const updatetableau = [...this.state.tasks];

    // Remplacer l'élément à l'index spécifié
    updatetableau[this.state.currentIndex] = this.state.task;

    this.setState({ tasks: updatetableau, task: "", currentIndex: null });
    // Mettre à jour l'état avec le nouveau tableau
    localStorage.setItem("tasks", JSON.stringify(updatetableau));
    // ----------------
    this.setState({ submitType: this.handleSubmit });
    this.setState({ icone: "fa-solid fa-plus" });
    this.setState({ background: "btn btn-active" });

    console.table(this.state.tasks);
  };
  handleDelete = (index) => {
    // pour supprimer l'element nous allons creer une nouvelles liste des taches sans y integrer l'element à supprimer avec la methode filtrer
    const tableauFiltre = this.state.tasks.filter(
      (task, taskIndex) => taskIndex !== index
    );
    // et maintenant nous allos mettre a jour le local storage
    // rappel : pour mettre a jour un state on utilise setState()
    this.setState({ tasks: tableauFiltre, task: "" }, () => {
      localStorage.setItem("tasks", JSON.stringify(tableauFiltre));
    });
    this.setState({ icone: "fa-solid fa-plus" });
    this.setState({ background: "btn btn-active" });
    this.setState({ submitType: "{this.handleSubmit}" });
    console.log("Boutton de suppression cliqué !");
  };
  render() {
    return (
      <>
        <div>
          <form onSubmit={this.state.submitType}>
            <div className="form-control w-50 col-12 col-md-6 mx-auto d-flex mt-5">
              <input
                type="text"
                className="form-control rounded"
                placeholder="Add item"
                name="task name"
                value={this.state.task}
                onChange={this.handleChange}
                required
              />
              {/* Button trigger modal  */}
              <button type="submit" className={this.state.background}>
                <i className={this.state.icone}></i>
              </button>
            </div>
          </form>
          {/* affichage de la liste des taches */}
          <div className="container task-part">
            <h2 className="text-center mt-5 mx-auto pb-2">List of tasks</h2>
            <div>
              <table className="affichage_tableau mt-3">
                <thead>
                  <tr>
                    <th>Tasks</th>
                  </tr>
                </thead>
                <tbody id="table-body">
                  {/* Les lignes de données vont être insérées ici par JavaScript  */}
                  {this.state.tasks.map((task, index) => (
                    <tr key={index}>
                      <td
                        className="d-flex justify-content-between align-items-center"
                        indexdata={index}
                      >
                        {task}
                        <div>
                          <button
                            className="btn btn-warning me-2"
                            onClick={() => this.handleCallEdit(index)}
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => this.handleDelete(index)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// Affichage du composant dans un élément HTML avec l'id "root"
ReactDOM.render(<App />, document.getElementById("root"));
