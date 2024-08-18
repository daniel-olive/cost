import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";

function NewProject() {
    const history = useHistory();

    function createPost(project) {
        project.cost = 0;
        project.services = [];
        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("A resposta da rede não foi boa");
            }
            return resp.json();
        })
            .then((data) => {
                console.log(data);
                history.push("/projects", {
                    message: "Projeto criado com sucesso!",
                });
            })
            .catch((error) => console.log(error));
    }


    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
        </div>
    );
}

export default NewProject;
