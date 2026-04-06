import { useEffect, useState } from "react";
import API from "../services/api";
import "./Projects.css";

function Projects() {

  const [projects, setProjects] =
    useState([]);

  /* Fetch projects */

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects =
    async () => {

      try {

        const res =
          await API.get("/projects");

        setProjects(res.data);

      } catch (error) {

        console.error(
          "Error fetching projects:",
          error
        );

      }

    };

  /* Download ZIP */

  const handleDownload =
    (zipPath) => {

      const fileName =
        zipPath.split("/").pop();

      window.open(
        `http://localhost:5050/tmp/${fileName}`
      );

    };

  return (

<div className="projects-page">

<h1 className="projects-title">

Your Extensions 📦

</h1>

<div className="projects-grid">

{projects.map((project) => (

<div
key={project._id}
className="project-card"
>

<h3>

{project.name}

</h3>

<p>

Prompt:
{project.prompt}

</p>

<span>

{new Date(
project.createdAt
).toLocaleString()}

</span>

<button

className="download-btn"

onClick={() =>
handleDownload(
project.zipPath
)
}

>

Download ZIP ⬇️

</button>

</div>

))}

</div>

</div>

  );

}

export default Projects;