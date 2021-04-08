const express = require('express'); 
const app = express(); 
const port = 3000; 

//Lägger till en middleware
//All inkommande anrop ska body parsas från json till JS 
app.use(express.json())

const courses = [
    
    {   
        id: 1, 
        name:'HTML & CSS',
        points: 20,
        location: 'Göteborg'
    }, 
    { 
        id: 2,
        name:'JavaScript grundkurs',
        points: 60,
        location: 'remote/Göteborg'

    }, 
    { 
        id: 3,
        name:'Projektarbete med agila metoder',
        points: 15,
        location: 'remote/Göteborg'

    }, 
    { 
        id: 4,
        name:'JavaScript fördjupning',
        points: 40,
        location: 'remote/Göteborg'

    }, 
]; 

//Rootsidan 
app.get('/', (req, res) => {
    res.json('hello world') //route handler 
}); 

//Visar alla kurser 
app.get('/api/courses', (req, res) => {
    res.json(courses); 
}); 


//Lägger till en kurs 
app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length +1, 
        name: req.body.name
    }; 
    res.status(201); // Requesten var successful 
    courses.push(course); 
    res.json(course); //skicka alltid tillbaka json
})


//Hämtar en specifik kurs med ett id 
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id)); 
  if(!course) res.status(404).send('The course with the given ID was not found')
  res.json(course); 
})


//Startar servern 
app.listen(port, () => console.log(` Server is running at http://localhost:${port}`)); 