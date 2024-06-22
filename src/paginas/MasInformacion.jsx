// src/paginas/MasInformacion.jsx
import React from "react";
import Navbar from '../componentes/Navbar';
import './Masinformacion.css'; // Importar el archivo CSS

const MasInformacion = () => {
  return (
    <>
      <Navbar />
      <div className="mas-informacion-container">
        <h2>Más Información</h2>
        <p>Nuestra página de gestión de notas y categorías está diseñada para ofrecer a los usuarios una plataforma eficiente y organizada para manejar sus tareas y notas personales de manera efectiva. Con un enfoque en la usabilidad y la flexibilidad, esta página facilita diversas acciones clave que mejoran la productividad y la organización personal.</p>
        
        <section>
          <h3>Funcionalidades Principales:</h3>
          <ul>
            <li>
              <strong>Gestión Integral de Notas:</strong>
              <ul>
                <li>Crear, Editar y Eliminar Notas</li>
                <li>Archivar/Desarchivar Notas</li>
                <li>Listado de Notas Activas y Archivadas</li>
              </ul>
            </li>
            <li>
              <strong>Gestión Avanzada de Categorías:</strong>
              <ul>
                <li>Agregar y Eliminar Categorías</li>
                <li>Filtrar Notas por Categoría</li>
              </ul>
            </li>
          </ul>
        </section>

        <p>Estas funcionalidades permiten a los usuarios estructurar su información de manera significativa y accesible, fomentando una mayor claridad mental y un enfoque más centrado en las actividades importantes.</p>

        <h3>Beneficios para los Usuarios:</h3>
        <ul>
          <li>Simplificación de la gestión diaria de tareas y notas.</li>
          <li>Promoción de la organización y la eficiencia personal.</li>
          <li>Flexibilidad para adaptarse a métodos de trabajo y preferencias personales.</li>
          <li>Mejora en la experiencia de usuario y satisfacción con la aplicación.</li>
        </ul>

        <p>Nuestra página está diseñada con un diseño intuitivo y funcionalidades robustas para facilitar la organización y la productividad personal, ayudando a nuestros usuarios a alcanzar sus objetivos de manera más efectiva.</p>
      </div>
    </>
  );
};

export default MasInformacion;
