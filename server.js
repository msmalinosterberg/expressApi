const express = require('express'); 
const app = express(); 
const port = 3000; 

const courses = [
    { id: 1, name:'course1'}, 
    { id: 2, name:'course2'}, 
    { id: 3, name:'course3'}, 
    { id: 4, name:'course4'}, 
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