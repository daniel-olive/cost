import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Message from "../layout/Message";
import LinkButton from "../layout/LinkButton";
import Container from "../layout/Container";
import styles from "./Projects.module.css";
import ProjectCard from "../project/ProjectCard";
import { useEffect, useState } from "react";
import Loading from "../layout/Loading";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoader, setRemoveLoader] = useState(false);
    const url = "http://localhost:5000/projects/";

    const location = useLocation();
    let message = "";
    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        setInterval(() => {
            fetch("http://localhost:5000/projects", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => response.json())
                .then((data) => {
                    setProjects(data);
                    setRemoveLoader(true);
                })
                .catch((err) => console.log(err));
        }, 1000);
    }, []);

    function removeProject(id) {
        fetch(`${url}${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("O projeto não pôde ser removido");
                }
                return response;
            })
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id));
            })
            .catch((error) => {
                console.error("Erro ao remover projeto:", error);
            });
    }
    return (
        <div className={styles.projects_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to={"/newproject"} text={"Criar Projeto"} />
            </div>
            {message && <Message type="success" msg={message} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((item) => (
                        <ProjectCard
                            id={item.id}
                            name={item.name}
                            budget={item.budget}
                            category={item.category.name}
                            key={item.id}
                            handleRemove={removeProject}
                        />
                    ))}
                {!removeLoader && <Loading />}
                {removeLoader && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    );
}

export default Projects;
