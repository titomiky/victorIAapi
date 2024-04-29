// Connect to the MongoDB database
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://root:vDHH4ZtZQUag6Fre@localhost:27017/holaqueai?authMechanism=DEFAULT&authSource=admin'; // Replace with your database name

// Define the competencies data
const competencies = [
  { name: 'Comunicación Efectiva', description: 'Habilidad para transmitir ideas de forma clara, concisa y persuasiva, tanto oralmente como por escrito.' },
  { name: 'Trabajo en Equipo', description: 'Capacidad para colaborar eficazmente con otros para lograr objetivos comunes.' },
  { name: 'Pensamiento Crítico', description: 'Habilidad para analizar información de manera objetiva y evaluar argumentos de forma lógica.' },
  { name: 'Resolución de Problemas', description: 'Capacidad para identificar, analizar y resolver problemas de manera creativa y eficaz.' },
  { name: 'Liderazgo', description: 'Habilidad para inspirar, motivar y guiar a otros hacia el logro de objetivos comunes.' },
  { name: 'Adaptabilidad y Flexibilidad', description: 'Capacidad para ajustarse a los cambios de manera positiva y constructiva.' },
  { name: 'Gestión del Tiempo y Organización', description: 'Habilidad para planificar, organizar y ejecutar tareas de manera eficiente.' },
  { name: 'Inteligencia Emocional', description: 'Capacidad para comprender, gestionar y expresar emociones de manera efectiva.' },
  { name: 'Orientación a Resultados', description: 'Enfoque en alcanzar objetivos específicos y tangibles.' },
  { name: 'Capacidad de Aprendizaje y Desarrollo', description: 'Habilidad para adquirir nuevos conocimientos y habilidades de manera continua.' },
];

// Connect to the database
const client = new MongoClient(uri);
client.connect(err => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  const db = client.db('holaqueai'); // Replace with your database name
  const collection = db.collection('competences');

  // Insert the competencies into the collection
  collection.insertMany(competencies, (err, result) => {
    if (err) {
      console.error('Error inserting competencies:', err);
      return;
    }

    console.log('Competencias insertadas con éxito:', result.insertedCount);
    client.close();
  });
});
