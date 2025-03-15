# Gestión de Planos Arquitectónicos - Frontend con React JS

Este proyecto es una aplicación web desarrollada con **React JS** y **Vite** para la gestión de planos arquitectónicos. Permite a los usuarios consultar planos por autor, ver detalles de cada plano y visualizar un dibujo basado en los puntos del plano. El backend se simula utilizando `apimock.js`, lo que permite desarrollar y probar el frontend sin necesidad de un servidor backend real.

---

## Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 16 o superior).
- **npm** (viene incluido con Node.js).

---

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/Mar972310/ARSW_LAB6.git
   cd ARSW_LAB6
----

Instala las dependencias:
    
```bash 
npm install
```

Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite y abrirá la aplicación en tu navegador (generalmente en http://localhost:5173).

----
## Estructura:
   ```bash
        /proyecto
        │
        ├── /public
        │   └── vite.svg
        │
        ├── /src
        │   ├── /components
        │   │   ├── Titulo.jsx
        │   │   ├── FindAuthor.jsx
        │   │   ├── Table.jsx
        │   │   ├── Points.jsx
        │   │   └── Canvas.jsx
        │   ├── App.jsx
        │   ├── main.jsx
        │   └── index.css
        │
        ├── index.html
        ├── package.json
        ├── vite.config.js
        └── .eslintrc.json
```

## Implementación
### Componentes Principales
#### App.jsx:

- Es el componente principal que integra todos los demás componentes.

- Maneja el estado global de la aplicación (autor seleccionado, lista de planos, plano seleccionado, total de puntos).

#### FindAuthor.jsx:

- Permite al usuario ingresar el nombre de un autor y hacer clic en "Get blueprints" para obtener los planos asociados.

#### Table.jsx:

- Muestra una tabla con los planos del autor seleccionado, incluyendo el nombre del plano, el número de puntos y un botón para abrir el plano.

#### Points.jsx:

- Muestra el total de puntos de todos los planos del autor seleccionado.

#### Canvas.jsx:

- Muestra el dibujo del plano seleccionado, renderizando los puntos como una secuencia de segmentos de recta.

## React + Vite

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
