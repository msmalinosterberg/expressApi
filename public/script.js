window.addEventListener("load", main);

function main() {
    addEventListeners()
}

function addEventListeners() {
    // GET ALL COURSES
    const btnAllCourses = document.getElementById("allCourses")
    btnAllCourses.addEventListener("click", getAllCourses)

    // GET SPECIFIC COURSE 
    const btnSpecificCourse = document.getElementById("specificCourse")
    btnSpecificCourse.addEventListener("click", getSpecificCourse, updateSpecificCourse)

    //ADD COURSE 
    const btnAddCourse = document.getElementById("addCourse")
    btnAddCourse.addEventListener("click", saveNewCourse)

    // DELETE COURSE  
    const btnDeleteCourse = document.getElementById("deleteCourse")
    btnDeleteCourse.addEventListener("click", deleteCourse)

    //UPDATE COURSE 
    const btnUpdateCourse = document.getElementById("updateCourse")
    btnUpdateCourse.addEventListener("click", updateSpecificCourse)
}


// GET ALL COURSES 
async function getAllCourses() {
    const courses = await makeRequest("/api/courses", "GET")
    const ul = document.getElementById("courseList");
    
    courses.forEach((course) => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode("Id: " + course.id + "  "));
        li.appendChild(document.createTextNode("Name: " + course.name + "  "));
        li.appendChild(document.createTextNode("Points: " + course.points + "  "));
        li.appendChild(document.createTextNode("Location: " + course.location + "  "));
        ul.appendChild(li);
    });
    return courses;
}


//GET SPECIFIC COURSE 
async function getSpecificCourse() {
    const idValue = document.getElementById('specificId').value  
    const course = await makeRequest("/api/courses/" + idValue, "GET")

    if(idValue) idValue.toString(); 
    if(!idValue) return alert('Please insert a valid id')

    const ul = document.getElementById("specificCourseUl");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode("Id: " + course.id + "  "));
    li.appendChild(document.createTextNode("Name: " + course.name + "  "));
    li.appendChild(document.createTextNode("Points: " + course.points + "  "));
    li.appendChild(document.createTextNode("Location: " + course.location + "  "));
    ul.appendChild(li);
    return course;
}

//UPDATE COURSE 
async function updateSpecificCourse(id, name, points, location) {
    const updateCourseId = document.getElementById('formUpdateCourseId').value
    const updateCourseName = document.getElementById('formUpdateCourseName').value
    const updateCoursePoints = document.getElementById('formUpdateCoursePoints').value
    const updateCourseLocation = document.getElementById('formUpdateCourseLocation').value
      
    const body = {
        id: updateCourseId, 
        name: updateCourseName, 
        points: updateCoursePoints, 
        location: updateCourseLocation
    }

    const updatedCourse = await makeRequest("/api/courses/" + updateCourseId,"PUT", body)
    const p = document.getElementById("updatedCourse");
    p.appendChild(document.createTextNode(`Course was updated`));
    return updatedCourse; 
}


// ADD NEW COURSE
async function saveNewCourse(name, points, location) {
    const inputAddCourseName = document.getElementById('formAddNewCourseName').value
    const inputAddCoursePoints = document.getElementById('formAddNewCoursePoints').value
    const inputAddCourseLocation = document.getElementById('formAddNewCourseLocation').value

    const body = {
        name: inputAddCourseName,
        points: inputAddCoursePoints,
        location: inputAddCourseLocation
    }
    const status = await makeRequest("/api/courses", "POST", body)
    const p = document.getElementById("addedCourse");
    p.appendChild(document.createTextNode(`Course was added`));
    return; 
}

// DELETE COURSE
async function deleteCourse() {
    let inputDelete = document.getElementById('inputDeleteId').value

    if(inputDelete) inputDelete.toString(); 
    if(!inputDelete) return alert('Please insert a valid id')

    const course = await makeRequest("/api/courses/" + inputDelete, "DELETE")
    const p = document.getElementById("deletedCourse");
    p.appendChild(document.createTextNode(`Course with id ${inputDelete} was deleted`));
}


async function makeRequest(url, method, body) {
    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json()
    return result;
}