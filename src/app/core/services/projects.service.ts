import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor() { }
  projects = [
    {
      title: 'Ecommerce',
      description: 'En lo que es el desarrollo se usó react-router-dom para manejar las distinas rutas que tendrá el ecommerce. Se implementó Redux para manejar las acciones y el estado de la web app. En la creación del formulario se usó de librería formik, y las llamadas a la API, con implementación de axios, para el manejo de estilos se usó Bootstrap para simplificar el desarrollo.',
      stack: ['React', 'Bootstrap', 'Fake store API'],
      img: 'https://ivanarmolla.netlify.app/static/media/ecommerce.7e248d0ccf43c4b4f07c.PNG',
      link: 'https://ecommerce-167.netlify.app/',
      repository: 'https://github.com/iarmolla/ecommerce-api'
    },
    {
      title: 'Dashboard',
      description: 'Panel de administración: El objetivo es obtener, un control organizado de los empleados, que estén registrados. El panel ofrece gráficos del sueldo que recibe el empleado para tener una mejor visualización del mismo, y poder tomar decisiones con lo anterior.',
      stack: ['React', 'Tailwind', 'Recharts', 'MySQL', 'Express', 'Docker'],
      img: 'https://ivanarmolla.netlify.app/static/media/dashboard.58a66e666948e3b73ef3.png',
      link: 'https://chimerical-mandazi-47f4f8.netlify.app/login',
      repository: 'https://github.com/iarmolla/dashboard-react'
    },
    {
      title: 'Chat Socket.IO',
      description: 'Este proyecto consiste en un chat en tiempo real construido con React en el frontend y Node.js en el backend. El objetivo es mostrar cómo se puede crear una aplicación de chat funcional utilizando estas tecnologías.',
      stack: ['React', 'Tailwind', 'Nodejs', 'MongoDB', 'Docker'],
      img: 'https://ivanarmolla.netlify.app/static/media/chat.f0762428de48d027e193.PNG',
      link: 'https://golden-pithivier-8c6fd5.netlify.app/',
      repository: 'https://github.com/iarmolla/chat-react'
    },
    {
      title: 'Proet Cursos',
      description: 'Proet aplicación de cursos para suscribirte a los distintos cursos. Sección de compras con tarjeta de credito validaciones de email y envios del mismo al finalizar la compra.',
      stack: ['React', 'Email JS', 'Abstract API', 'Docker'],
      img: 'https://ivanarmolla.netlify.app/static/media/proet.72e625503dbd73698d12.PNG',
      link: 'https://ecommerce-167.netlify.app/',
      repository: 'https://github.com/iarmolla/course-react'
    },
    {
      title: 'Giphy-app',
      description: 'Un clon de uno de los buscadores de GIFS mas populares.',
      stack: ['React', 'Tailwind', 'Giphy API', 'Docker'],
      img: 'https://ivanarmolla.netlify.app/static/media/gif.eb8f094cd3ed1a07ad71.PNG',
      link: 'https://giphy-645.netlify.app/',
      repository: 'https://github.com/iarmolla/giphy-app'
    },
    {
      title: 'Rick and Morty API',
      description: 'Web app para ver los personajes de Rick and Morty ,episodios y fechas de estreno, para las llamadas a la API se hizo usó de AXIOS.',
      stack: ['React', 'Tailwind', 'Rick and Morty API', 'Docker'],
      img: 'https://ivanarmolla.netlify.app/static/media/rick.c1d7b3b51f16ccfcd1d6.PNG',
      link: 'https://magenta-hummingbird-5754c9.netlify.app/',
      repository: 'https://github.com/iarmolla/rick-and-morty-react'
    },
  ]
  technologies = [
    { name: 'Angular', img: '../../../../assets/svgs/angular.svg' },
    { name: 'Nodejs', img: '../../../../assets/svgs/nodejs.svg' },
    { name: 'Docker', img: '../../../../assets/svgs/docker.svg' },
    { name: 'AWS', img: '../../../../assets/svgs/aws.svg' },
    { name: 'PHP', img: '../../../../assets/svgs/php.svg' },
    { name: 'React', img: '../../../../assets/svgs/react.svg' },
    { name: 'Git', img: '../../../../assets/svgs/git.svg', },
    { name: 'SQL', img: '../../../../assets/svgs/mysql.svg' },
  ];
}
