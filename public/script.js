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
    const ul = document.getElementById("courseList");
    ul.innerHTML = "";
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

async function getSpecificCourse(id) {
    const course = await makeRequest("/api/courses/" + "3", "GET")
    console.log(course)
    const ul = document.getElementById("courseList");
        const li = document.createElement("li");
        li.appendChild(document.createTextNode("Id: "+ course.id + "  "));
        li.appendChild(document.createTextNode("Name: "+ course.name + "  "));
        li.appendChild(document.createTextNode("Points: " + course.points + "  "));
        li.appendChild(document.createTextNode("Location: "+ course.location + "  "));
        ul.appendChild(li);
        return course; 
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