const express = require('express');
const fs = require("fs");
const app = express();
const port = 3000;
app.use(express.static('./public'))
app.use(express.json());


app.get('/', (req, res) => {
    res.json(courses);
});


// all courses 
app.get("/api/courses", (req, res) => {
    fs.readFile('courseList.json', (err, data) => {
        let courses = JSON.parse(data)
        if (err) {
            res.status(404).json('there are no courses')
        }
        res.json(courses);
    })
});

// specific course with id 
app.get('/api/courses/:id', (req, res) => {
    fs.readFile('courseList.json', (err, data) => {

        const courses = JSON.parse(data);
        const id = req.params.id
        const foundCourse = courses.find((course) => {
            return course.id == id
        })

        if (!foundCourse) {
            res.json({ "Error": "This id doesn't exist" });
        }
        res.json(foundCourse);
        return;
    })

});

// add new course 
app.post('/api/courses', (req, res) => {
    fs.readFile('courseList.json', (err, data) => {
        let courses = JSON.parse(data)
        let idToSave = 0;
        courses.forEach((course) => {
            if (course.id > idToSave) {
                idToSave = course.id
            }
        })
        idToSave++
        res.status(201);
        courses.push({
            id: idToSave,
            ...req.body
        })
        fs.writeFile('courseList.json', JSON.stringify(courses, null, 2), (err) => {
            res.json({
                status: "Added new course"
            })
        })
    })
});



// UPDATE SPECIFIC COURSE  
app.put('/api/courses/:id', (req, res) => {
    fs.readFile('courseList.json', (err, data) => {
        let courses = JSON.parse(data)
        if (err) {
            return res.status(404).json('This page doesnt exist.');
        }
    
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if (!course) {
            return res.json("The id doesn't exist. Try another one.");
          }
        course.name = req.body.name,
            course.points = req.body.points,
            course.location = req.body.location;
           

        res.json(course)
        fs.writeFile('./courseList.json', JSON.stringify(courses), (err) => {
            
                res.json({
                    status: "Course updated"
                })
            
            
        })
        return;
    })
})

//DELETE COURSE 
app.delete('/api/courses/:id', (req, res) => {
    fs.readFile('courseList.json', (err, data) => {
        const { id } = req.params; 
        let courses = JSON.parse(data)
        if (err) {
            return res.status(400).json(courses);
          }
        
        const course  = courses.find((course) => course.id === parseInt((id)));
        if (!course) {
            return res.status(400).json("The id doesn't exist. Try another one.");
        } 
        const index = courses.findIndex((course) => course.id ===parseInt(id));
        courses.splice(index, 1);
        fs.writeFile('./courseList.json', JSON.stringify(courses, null, 2), (err) => {
            if (err) {
                return res.status(400).json(course);
            }
              res.json({
                status: "Course deleted"
            })
            
        })
    })
    return;
})





app.listen(port, () => console.log(` Server is running at http://localhost:${port}`));
