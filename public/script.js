window.addEventListener("load", main);

function main() {
    addEventListeners()
}

function addEventListeners() {
    // Alla kurser
    const btnAllCourses = document.getElementById("allCourses")
    btnAllCourses.addEventListener("click", getAllCourses)

    // Specifik kurs 
    const btnSpecificCourse = document.getElementById("specificCourse")
    btnSpecificCourse.addEventListener("click", getSpecificCourse, updateSpecificCourse)

    //Spara ny kurs 
    const btnAddCourse = document.getElementById("addCourse")
    btnAddCourse.addEventListener("click", saveNewCourse)

    //Delete kurs 
    const btnDeleteCourse = document.getElementById("deleteCourse")
    btnDeleteCourse.addEventListener("click", deleteCourse)

    //Update kurs 
    const btnUpdateCourse = document.getElementById("updateCourse")
    btnUpdateCourse.addEventListener("click", updateSpecificCourse)
}


async function updateSpecificCourse(id, name, points, location) {
    let updateCourseId = document.getElementById('formUpdateCourseId').value
    let updateCourseName = document.getElementById('formUpdateCourseName').value
    let updateCoursePoints = document.getElementById('formUpdateCoursePoints').value
    let updateCourseLocation = document.getElementById('formUpdateCourseLocation').value
  
    console.log(updateCourseId, updateCourseName, updateCoursePoints, updateCourseLocation)
    
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



async function getSpecificCourse() {
    const id = document.getElementById('specificId').value
    console.log(id)    
    const course = await makeRequest("/api/courses/" + id, "GET")

    const ul = document.getElementById("specificCourseUl");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode("Id: " + course.id + "  "));
    li.appendChild(document.createTextNode("Name: " + course.name + "  "));
    li.appendChild(document.createTextNode("Points: " + course.points + "  "));
    li.appendChild(document.createTextNode("Location: " + course.location + "  "));
    ul.appendChild(li);
    
    return course;
}



async function saveNewCourse(name, points, location) {
    let inputAddCourseName = document.getElementById('formAddNewCourseName').value
    let inputAddCoursePoints = document.getElementById('formAddNewCoursePoints').value
    let inputAddCourseLocation = document.getElementById('formAddNewCourseLocation').value

    let body = {
        name: inputAddCourseName,
        points: inputAddCoursePoints,
        location: inputAddCourseLocation
    }
    const status = await makeRequest("/api/courses", "POST", body)
    console.log(status)
    const p = document.getElementById("addedCourse");
    p.appendChild(document.createTextNode(`Course was added`));
  
    return;
    
}


async function deleteCourse() {
    let inputDelete = document.getElementById('inputDeleteId').value
    const course = await makeRequest("/api/courses/" + inputDelete, "DELETE")
    const p = document.getElementById("deletedCourse");
    p.appendChild(document.createTextNode(`Course with id ${inputDelete} was deleted`));

    //Lägg till error 
    // Om id inte existerar så try again 

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