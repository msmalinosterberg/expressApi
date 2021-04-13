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

}

async function getAllCourses() {
    const courses = await makeRequest("/api/courses", "GET")
    console.log(courses)
    const ul = document.getElementById("list");
    ul.innerHTML = "";
    courses.forEach((course) => {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(course.name + " - "));
      li.appendChild(document.createTextNode(course.points + " - "));
      li.appendChild(document.createTextNode(course.location));
      ul.appendChild(li);
    });
}

async function getSpecificCourse(id) {
    const course = await makeRequest("/api/courses/" + "3", "GET")
    console.log(course)
    const ul = document.getElementById("list");
 
    courses.forEach((course) => {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(course.name + " - "));
      li.appendChild(document.createTextNode(course.points + " - "));
      li.appendChild(document.createTextNode(course.location));
      ul.appendChild(li);
    });
}


function saveNewCourse() {
 
}

async function makeRequest(url, method, body) {
   
    const response = await fetch(url, {
        method: method, 
        body: body,
        headers: {
            'Content-Type': 'application/json'
        } 
   })
    const result = await response.json()
    return result; 
}