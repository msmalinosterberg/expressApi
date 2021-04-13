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
    console.log(courses)
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


async function saveNewCourse(course) {
    const body = {
        //?? 
    }
    const status = await makeRequest("/api/courses", "POST", body)
    console.log(status)
    return course; 
 
}


async function deleteCourse(id) {
    const course = await makeRequest("/api/courses/" + "4", "DELETE")
    console.log(course)
    const ul = document.getElementById("deletedCourse");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode("Id: "+ course.id + "  "));
    li.appendChild(document.createTextNode("Name: "+ course.name + "  "));
    li.appendChild(document.createTextNode("Points: " + course.points + "  "));
    li.appendChild(document.createTextNode("Location: "+ course.location + "  "));
    ul.appendChild(li);




}

function clearParagraph() {
    const p = document.getElementById("para");
    p.innerHTML = "";
  }
  function clearUl() {
    const ul = document.getElementById("list");
    ul.innerHTML = "";
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