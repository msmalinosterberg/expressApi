window.addEventListener("load", main); 

function main () {
    addEventListeners() 
}

function addEventListeners() {
    // Alla kurser
    const btnAllCourses = document.getElementById("allCourses")
    btnAllCourses.addEventListener("click", getAllCourses)
    // Specifik kurs 
    const btnSpecificCourse = document.getElementById("specificCourse")
    btnSpecificCourse.addEventListener("click", getSpecificCourse)

    //Spara ny kurs 
    const btnAddCourse = document.getElementById("addCourse")
    btnAddCourse.addEventListener("click", saveNewCourse)

    //Delete kurs 
    btnDeleteCourse = document.getElementById("deleteCourse")
    btnDeleteCourse.addEventListener("click", deleteCourse)

}




async function getAllCourses() {
    const courses = await makeRequest("/api/courses", "GET")
    const ul = document.getElementById("courseList");
    courses.forEach((course) => {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode("Id: "+ course.id + "  "));
      li.appendChild(document.createTextNode("Name: "+ course.name + "  "));
      li.appendChild(document.createTextNode("Points: " + course.points + "  "));
      li.appendChild(document.createTextNode("Location: "+ course.location + "  "));
      ul.appendChild(li);
    });
    return courses; 
}



async function getSpecificCourse() {
    const id = document.getElementById('specificId').value
    console.log(id)
    const course = await makeRequest("/api/courses/" +id,"GET")
    
    const ul = document.getElementById("specificCourseUl");
        const li = document.createElement("li");
        li.appendChild(document.createTextNode("Id: "+ course.id + "  "));
        li.appendChild(document.createTextNode("Name: "+ course.name + "  "));
        li.appendChild(document.createTextNode("Points: " + course.points + "  "));
        li.appendChild(document.createTextNode("Location: "+ course.location + "  "));
        ul.appendChild(li);
        return course;  
}



async function saveNewCourse(name, price, location) {
    let inputAddCourseName = document.getElementById('formAddNewCourseName').value
    let inputAddCoursePoints = document.getElementById('formAddNewCoursePoints').value
    let inputAddCourseLocation = document.getElementById('formAddNewCourseLocation').value

    let body = { 
    name: inputAddCourseName, 
    points: inputAddCoursePoints, 
    location: inputAddCourseLocation
    }   
    
    console.log(inputAddCourseName,inputAddCoursePoints, inputAddCourseLocation )

    const status = await makeRequest("/api/courses", "POST", body)
    console.log(status)
    return; 
 
}


async function deleteCourse() {
    let inputDelete = document.getElementById('inputDeleteId').value
    const course = await makeRequest("/api/courses/" +inputDelete,  "DELETE")
    const p = document.getElementById("deletedCourse");
    p.appendChild(document.createTextNode(`Course with id ${inputDelete} was deleted`));

    // if value from input matchar course.id. splice det id. 
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