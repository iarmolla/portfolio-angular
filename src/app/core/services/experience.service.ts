import { Injectable } from '@angular/core';
import { TimelineItem } from '../interfaces/TimelineItem';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor() { }
  careerStart = new Date(2023, 5, 1)
  timeline: TimelineItem[] = [
    {
      type: 'work',
      title: 'Desarrollador Backend',
      place: 'Nubceo',
      start: '07/2025',
      current: true,
      summary: 'Conectores que integran plataformas de pago, adquirentes y procesadores con la conciliación financiera, vía APIs REST y SFTP. Normalización de transacciones y resolución de diferencias de conciliación con SQL sobre PostgreSQL.',
      stack: ['Node.js', 'Sequelize', 'PostgreSQL', 'AWS Lambda', 'SQS', 'CloudWatch']
    },
    {
      type: 'education',
      title: 'Licenciatura en Gestión de la Información',
      place: 'Universidad Nacional de Lomas de Zamora',
      start: '2025',
      end: 'en curso',
      stack: []
    },
    {
      type: 'work',
      title: 'Full Stack Developer',
      place: 'DSN Empresas Consultora de Sistemas',
      shortPlace: 'DSN',
      start: '01/2025',
      end: '07/2025',
      summary: 'Ecommerce en Angular para la gestión de productos y usuarios, con componentes reutilizables e integración a microservicios con autenticación en Keycloak.',
      stack: ['Angular', 'NestJS', 'Next.js', 'PostgreSQL', 'GCP Cloud Run']
    },
    {
      type: 'work',
      title: 'Full Stack Developer',
      place: 'Eurekaplicaciones',
      start: '08/2023',
      end: '01/2025',
      summary: 'Sistema de procesamiento de pagos mediante web scraping. Aplicaciones en contenedores Docker desplegadas en AWS y GCP.',
      stack: ['Angular', 'Node.js', 'Laravel', 'MySQL', 'Firebase', 'Docker', 'AWS', 'GKE']
    },
    {
      type: 'work',
      title: 'Frontend Developer',
      place: 'NoCountry',
      start: '06/2023',
      end: '07/2023',
      summary: 'Simulación laboral de un mes en equipo: desarrollo del frontend de un sitio de alquileres.',
      stack: ['Angular', 'Java', 'Docker', 'MySQL']
    },
    {
      type: 'education',
      title: 'Tecnicatura Superior en Análisis de Sistemas',
      place: 'ISTEA',
      start: '2021',
      end: '2022',
      stack: []
    },
  ]
  get yearsOfExperience(): number {
    const now = new Date()
    const months = (now.getFullYear() - this.careerStart.getFullYear()) * 12 + now.getMonth() - this.careerStart.getMonth()
    return Math.floor(months / 12)
  }
}
