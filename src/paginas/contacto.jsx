// src/paginas/Contacto.jsx
import React from "react";
import Navbar from '../componentes/Navbar';
import './contacto.css'; // Importar el archivo CSS

const Contacto = () => {
  return (
    <>
      <Navbar />
      <div className="contacto-container">
        <h2>Contacto</h2>
        <div className="descripcion">
          <p>
            Hola! Soy Juan Camilo Peña Erazo 🚀 estudiante de Ingeniería de Sistemas e ingeniería Industrial. Apasionado por la tecnología y el desarrollo de software. Mis habilidades abarcan tanto el mundo del desarrollo frontend 👨🏽‍💻 como el análisis de datos 📊 📈💻.
            En el ámbito del desarrollo, cuento con experiencia como Desarrollador Frontend Junior, con un nivel intermedio en el framework React y dominio de tecnologías como JavaScript, TypeScript, Bootstrap, HTML, CSS y Sass. Además, estoy familiarizado con herramientas 
            de control de versiones como GIT y GITHUB, así como con bases de datos MySQL. Mi pasión por la tecnología va más allá del desarrollo, también tengo experiencia en análisis de datos con Python, utilizando Jupyter Notebook y Anaconda, y bibliotecas como pandas, 
            matplotlib, seaborn y/o plotly.
          </p>
        </div>
        <div className="informacion-contacto">
          <h3>Información de Contacto:</h3>
          <ul>
            <li><strong>Nombre:</strong> Juan Camilo Peña Erazo</li>
            <li><strong>Email:</strong> penaerazocamilo21@gmail.com</li>
            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/juan-camilo-pe%C3%B1a-erazo-06ba36187/">J. Camilo Peña</a></li>
            <li><strong>GitHub:</strong> <a href="https://github.com/CamiloPE12">J. Camilo Peña</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contacto;
