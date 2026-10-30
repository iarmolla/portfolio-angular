import { Injectable } from '@angular/core';
import { StackGroup } from '../interfaces/Technology';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor() { }
  projects = [
    {
      title: 'Dashboard',
      description: 'Panel para administrar empleados, con gráficos de sueldos que ayudan a analizar y tomar decisiones.',
      stack: ['React', 'Tailwind', 'Recharts', 'MySQL', 'Express', 'Docker'],
      img: 'assets/images/dashboard.png',
      link: 'https://chimerical-mandazi-47f4f8.netlify.app/login',
      repository: 'https://github.com/iarmolla/dashboard-react'
    },
    {
      title: 'Chat en tiempo real',
      description: 'Chat con React en el frontend y Node.js con Socket.IO en el backend, persistido en MongoDB.',
      stack: ['React', 'Tailwind', 'Nodejs', 'MongoDB', 'Docker'],
      img: 'assets/images/chat.PNG',
      link: 'https://golden-pithivier-8c6fd5.netlify.app/',
      repository: 'https://github.com/iarmolla/chat-react'
    },
    {
      title: 'Ecommerce',
      description: 'Tienda con rutas, carrito y estado global en Redux, formularios con Formik y consumo de una API con Axios.',
      stack: ['React', 'Redux', 'Bootstrap', 'Fake Store API'],
      img: 'assets/images/ecommerce.PNG',
      link: 'https://ecommerce-167.netlify.app/',
      repository: 'https://github.com/iarmolla/ecommerce-api'
    },
    {
      title: 'Proet Cursos',
      description: 'Plataforma de cursos con compra con tarjeta, validación de email y confirmación por correo al finalizar.',
      stack: ['React', 'EmailJS', 'Abstract API', 'Docker'],
      img: 'assets/images/proet.PNG',
      link: 'https://proet-e6dfc9.netlify.app',
      repository: 'https://github.com/iarmolla/course-react'
    },
    {
      title: 'Giphy App',
      description: 'Buscador de GIFs que consume la API de Giphy.',
      stack: ['React', 'Tailwind', 'Giphy API', 'Docker'],
      img: 'assets/images/gif.PNG',
      link: 'https://giphy-645.netlify.app/',
      repository: 'https://github.com/iarmolla/giphy-app'
    },
  ]
  stack: StackGroup[] = [
    {
      title: 'Frontend',
      items: [
        { name: 'Angular', aliases: ['angular'] },
        { name: 'React', aliases: ['react'] },
        { name: 'Next.js', aliases: ['next.js'] },
      ]
    },
    {
      title: 'Backend',
      items: [
        { name: 'Node.js', aliases: ['node.js', 'nodejs', 'express'] },
        { name: 'NestJS', aliases: ['nestjs'] },
        { name: 'PHP / Laravel', aliases: ['php', 'laravel'] },
        { name: 'Java', aliases: ['java'] },
      ]
    },
    {
      title: 'Datos',
      items: [
        { name: 'PostgreSQL', aliases: ['postgresql'] },
        { name: 'MySQL', aliases: ['mysql'] },
        { name: 'MongoDB', aliases: ['mongodb'] },
        { name: 'Firebase', aliases: ['firebase'] },
      ]
    },
    {
      title: 'Cloud y DevOps',
      items: [
        { name: 'Docker', aliases: ['docker'] },
        { name: 'AWS', aliases: ['aws', 'aws lambda', 'sqs', 'cloudwatch'] },
        { name: 'GCP', aliases: ['gcp', 'gcp cloud run', 'gke'] },
      ]
    },
  ]
}
