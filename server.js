const express = require('express'); 
const app = express(); 
const port = 3000; 

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


app.get('/', (req, res) => {
    res.send('hello world') //route handler 
}); 

app.get('/api/courses', (req, res) => {
    res.send(courses); 
}); 

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id)); 
  if(!course) res.status(404).send('The course with the given ID was not found')
  res.send(course); 
})

app.listen(port, () => console.log(` Server is running at http://localhost:${port}`)); 