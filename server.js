const express = require('express'); 
const app = express(); 
const port = 3000; 

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

// Endpoints 
app.get('/api/courses', (req, res) => {
    res.json(courses); 
}); 

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    //const id = req.params.id; 
    //const foundCourse = course.find(course) => {
     //   return course.id == id
   // }
    if(!course) return res.status(404).send('The course with the given ID was not found')
    res.json(course); 
  })

app.post('/api/courses', (req, res) => {
    const newCourse = {
        id: Date.now(),
        name: req.body.name, 
        points: req.body.points, 
        location: req.body.location
    }
    res.status(201);
    courses.push(newCourse); 
    res.json(courses);
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    course.name = req.body.name,
    course.location = req.body.location; 
    res.json(course)
})

app.delete('/api/courses', (req, res) => {
    const index = courses.findIndex(c => c.id === parseInt(req.params.id)); 
    const deletedCourse = courses.splice(index, 1); 
    res.json(deletedCourse); 
})

app.listen(port, () => console.log(` Server is running at http://localhost:${port}`)); 

// Kolla över felkoder. Felsökning 
// VG krav 
// Uppdatera readme filen 
// Ändra alla id så det passar bättre med random funktionen 