const express = require('express'); 
const app = express(); 
const port = 3000; 

//Lägger till en middleware
//All inkommande anrop ska body parsas från json till JavaScript 
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

//Serve alla filer i public filen
app.use(express.static('./public'))


//Visar alla kurser 
app.get('/api/courses', (req, res) => {
    res.json(courses); 
}); 


//Lägger till en kurs 
app.post('/api/courses', (req, res) => {
    const newCourse = {
        id: Date.now(),
        name: req.body.name, 
        points: req.body.points, 
        location: req.body.location
    }
    res.status(201); // Requesten var successful 
    courses.push(newCourse); 
    res.json(courses); //skicka alltid tillbaka json
})


//Hämtar en specifik kurs med ett id 
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id)); 
  if(!course) return res.status(404).send('The course with the given ID was not found')
  res.json(course); 
})


app.delete('api/courses', (req, res) => {
    
})

//Startar servern 
app.listen(port, () => console.log(` Server is running at http://localhost:${port}`)); 