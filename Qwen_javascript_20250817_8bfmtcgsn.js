// AI-like questions per course
const courseQuestions = {
  "Social Science Inclined": [
    "Why are you interested in social sciences?",
    "Describe a time you helped resolve a conflict between people.",
    "What do you think is the biggest social issue today?",
    "How can youth contribute to nation-building?",
    "Explain the importance of history in modern society.",
    "What does leadership mean to you?",
    "How do you handle group disagreements?",
    "Describe a community project you'd like to lead.",
    "Why should citizens participate in elections?",
    "What values are important in a democratic society?"
  ],
  "Architecture, Engineering and Aviation": [
    "What fascinates you about building or designing structures?",
    "Describe your dream infrastructure project.",
    "How do engineers solve real-world problems?",
    "What do you know about sustainable architecture?",
    "Why are safety standards important in construction?",
    "Explain how airplanes fly in simple terms.",
    "What tools or software would you like to learn?",
    "How can technology improve city planning?",
    "Describe a time you built something with your hands.",
    "What inspires you about aviation?"
  ],
  "Teaching": [
    "Why do you want to become a teacher?",
    "How would you help a struggling student?",
    "What makes a good classroom environment?",
    "Describe your ideal teaching style.",
    "How do teachers inspire students?",
    "What subject would you love to teach and why?",
    "How do you handle discipline in class?",
    "Why is education important for society?",
    "What qualities should a teacher have?",
    "How would you make learning fun?"
  ],
  "Uniform Service Professions": [
    "Why do you want to serve in uniformed services?",
    "What does discipline mean to you?",
    "Describe a time you showed courage.",
    "How do you handle stressful situations?",
    "What is the role of police/military in society?",
    "How would you help a victim in crisis?",
    "Why is teamwork important in uniformed services?",
    "What would you do if you saw injustice?",
    "How do you stay physically fit?",
    "Explain the importance of integrity."
  ],
  "Travel Attendant and Stewards": [
    "Why do you want to work in the airline or travel industry?",
    "How do you handle difficult passengers?",
    "Describe excellent customer service.",
    "What cultural awareness is important in tourism?",
    "How do you stay calm under pressure?",
    "Why is safety important in flights?",
    "What languages would you like to learn?",
    "Describe your dream destination.",
    "How do you handle emergencies?",
    "What makes a flight experience memorable?"
  ],
  "Business/Accountancy": [
    "Why are you interested in business or finance?",
    "What is the importance of budgeting?",
    "Describe a time you managed money wisely.",
    "How do entrepreneurs help the economy?",
    "What is the role of an accountant in a company?",
    "Why is honesty important in financial work?",
    "How can small businesses grow sustainably?",
    "Explain supply and demand in your own words.",
    "What business idea would you start?",
    "How do you make financial decisions?"
  ],
  "Industrial Arts – EIM": [
    "Why are you interested in electrical installation?",
    "Describe a simple electrical device you understand.",
    "What safety practices are important in EIM?",
    "How do circuits work in homes?",
    "What tools are used in electrical work?",
    "Why is proper wiring important?",
    "Describe a repair you’ve done or want to learn.",
    "How can electricity be used efficiently?",
    "What challenges do electricians face?",
    "What innovation would you bring to EIM?"
  ],
  "Ship deck and Maritime": [
    "Why do you want a career at sea?",
    "What do you know about maritime laws?",
    "How do ships navigate safely?",
    "Describe life on a ship.",
    "Why is ocean conservation important?",
    "What skills are needed for seafarers?",
    "How do you handle seasickness or isolation?",
    "What emergencies can happen at sea?",
    "Explain the importance of ports.",
    "What maritime technology interests you?"
  ],
  "Hospitality and Tourism": [
    "Why do you love the hospitality industry?",
    "How do you make guests feel welcome?",
    "Describe your ideal hotel experience.",
    "What tourist spots in the Philippines do you love?",
    "How do you handle guest complaints?",
    "Why is cultural sensitivity important in tourism?",
    "What events would you organize?",
    "How can tourism help local communities?",
    "What language skills help in hospitality?",
    "Describe a time you served someone well."
  ],
  "ICT": [
    "Why are you interested in Information and Communication Technology?",
    "What programming language would you like to learn?",
    "How does technology improve lives?",
    "Describe a useful app you’d create.",
    "What cybersecurity practices do you know?",
    "How do computers process information?",
    "Why is digital literacy important?",
    "What tech trends excite you?",
    "How can ICT help education?",
    "Describe a problem you’d solve with tech."
  ],
  "ALS": [
    "Why are you enrolling in ALS?",
    "What challenges did you face in formal education?",
    "How will education change your life?",
    "What skills do you want to learn?",
    "How can ALS help your community?",
    "Describe your learning goals.",
    "What motivates you to continue studying?",
    "How do you manage time for self-study?",
    "What job do you want after ALS?",
    "Why is lifelong learning important?"
  ]
};

// Load saved students
let enrolledStudents = JSON.parse(localStorage.getItem("enrolledStudents")) || [];

// Validate form and go to questions
function validateAndProceed() {
  const form = document.getElementById("studentForm");
  if (!form.checkValidity()) {
    alert("Please fill out all fields.");
    return;
  }

  const course = document.getElementById("course").value;
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("questionsPage").style.display = "block";
  document.getElementById("questionCourseTitle").textContent = `Answer 10 Questions: ${course}`;
  loadQuestions(course);
}

// Load shuffled questions
function loadQuestions(course) {
  const container = document.getElementById("questionsContainer");
  container.innerHTML = "";

  const questions = courseQuestions[course] || [];
  const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, 10);

  shuffled.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question-box";
    div.innerHTML = `
      <p>Question ${i+1}: ${q}</p>
      <textarea id="q${i}" required></textarea>
    `;
    container.appendChild(div);
  });

  document.getElementById("questionForm").onsubmit = (e) => {
    e.preventDefault();
    submitAssessment(course);
  };
}

// Submit answers and send email
function submitAssessment(chosenCourse) {
  const answers = [];
  let allFilled = true;
  for (let i = 0; i < 10; i++) {
    const val = document.getElementById(`q${i}`)?.value.trim();
    if (!val) allFilled = false;
    answers.push(val);
  }

  if (!allFilled) {
    alert("Please answer all questions.");
    return;
  }

  // Simulate score
  const wordCount = answers.join(" ").split(" ").length;
  const score = Math.min(100, Math.round((wordCount / 100) * 50 + 50));
  const passed = score >= 70;

  const student = {
    firstName: document.getElementById("firstName").value,
    middleName: document.getElementById("middleName").value,
    lastName: document.getElementById("lastName").value,
    birthDate: document.getElementById("birthDate").value,
    gender: document.getElementById("gender").value,
    address: document.getElementById("address").value,
    contact: document.getElementById("contact").value,
    email: document.getElementById("email").value,
    course: chosenCourse,
    score,
    passed,
    answers: answers.join(" | "),
    timestamp: new Date().toLocaleString()
  };

  // Save locally
  enrolledStudents.push(student);
  enrolledStudents.sort((a, b) => (a.lastName + a.firstName).localeCompare(b.lastName + b.firstName));
  localStorage.setItem("enrolledStudents", JSON.stringify(enrolledStudents));

  // 👉 SEND EMAIL VIA FORMSUBMIT.CO
  fetch('https://formsubmit.co/ajax/your-email@domain.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "Subject": `New Enrollment: ${student.firstName} ${student.lastName}`,
      "Full Name": `${student.firstName} ${student.middleName} ${student.lastName}`,
      "Email": student.email,
      "Gender": student.gender,
      "Birth Date": student.birthDate,
      "Address": student.address,
      "Contact": student.contact,
      "Course": student.course,
      "Score": `${student.score}/100`,
      "Status": student.passed ? "Accepted" : "Failed",
      "Answers": student.answers,
      "To": student.email,
      "_autoresponse": `Thank you ${student.firstName}! Your enrollment at Tagudin National High School has been received. We will contact you soon.`
    })
  })
  .then(() => {
    document.getElementById("questionsPage").style.display = "none";
    document.getElementById("resultsPage").style.display = "block";

    const resultMsg = document.getElementById("resultMessage");
    if (student.passed) {
      resultMsg.innerHTML = `
        <strong>Congratulations, ${student.firstName}!</strong><br>
        You passed with <strong>${student.score}/100</strong> and are accepted into <strong>${chosenCourse}</strong>.<br>
        Check your email for confirmation.
      `;
      document.getElementById("certName").textContent = `${student.firstName} ${student.lastName}`;
      document.getElementById("certCourse").textContent = chosenCourse;
      document.getElementById("certDate").textContent = new Date().toLocaleDateString();
      document.getElementById("certificateSection").style.display = "block";
    } else {
      const suggested = getSuggestedCourse(answers);
      resultMsg.innerHTML = `
        <strong>Sorry, ${student.firstName}.</strong><br>
        Score: <strong>${student.score}/100</strong> (needs 70).<br>
        We recommend: <strong>${suggested}</strong>.
      `;
    }
  })
  .catch(err => {
    alert("Enrollment submitted! Email failed, but we'll contact you soon.");
    document.getElementById("questionsPage").style.display = "none";
    document.getElementById("resultsPage").style.display = "block";
    document.getElementById("resultMessage").innerHTML = `
      Submitted successfully! We'll contact you soon.
    `;
  });
}

// Suggest course based on keywords
function getSuggestedCourse(answers) {
  const keywords = {
    "Teaching": ["help", "teach", "learn", "student", "education"],
    "Social Science Inclined": ["society", "people", "community", "nation"],
    "ICT": ["computer", "tech", "code", "digital"],
    "Hospitality and Tourism": ["guest", "service", "hotel", "travel"],
    "Business/Accountancy": ["money", "business", "finance", "budget"]
  };

  for (const [course, words] of Object.entries(keywords)) {
    if (answers.some(a => words.some(w => a.toLowerCase().includes(w)))) {
      return course;
    }
  }
  return "Business/Accountancy";
}

// Print certificate
function printCertificate() {
  const printContent = document.getElementById("certificateSection").innerHTML;
  const originalContent = document.body.innerHTML;
  document.body.innerHTML = `
    <div style="text-align:center; font-family:Arial; padding:50px;">
      <img src="https://tse3.mm.bing.net/th/id/OIP._ADQTDMHKNDaTHEmgKGq_gHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Logo" width="100">
      <h1>Tagudin National High School</h1>
      <h2>Enrollment Certificate</h2>
      <hr style="width:50%">
      ${printContent.replace("Print Certificate", "")}
      <p><i>Officially Signed</i></p>
    </div>
  `;
  window.print();
  document.body.innerHTML = originalContent;
  window.location.reload();
}

// Admin login
function adminLogin() {
  const pass = document.getElementById("adminPass").value;
  if (pass === "TagudinTNHS@2025!") {
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminDashboard").style.display = "block";
    displayAllStudents();
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

// Display all students
function displayAllStudents() {
  const container = document.getElementById("studentsData");
  if (enrolledStudents.length === 0) {
    container.innerHTML = "<p>No students enrolled yet.</p>";
    return;
  }

  let table = `
    <table>
      <tr>
        <th>Name</th>
        <th>Course</th>
        <th>Score</th>
        <th>Status</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Date</th>
      </tr>
  `;

  enrolledStudents.forEach(s => {
    table += `
      <tr>
        <td>${s.lastName}, ${s.firstName} ${s.middleName}</td>
        <td>${s.course}</td>
        <td>${s.score}/100</td>
        <td>${s.passed ? "Accepted" : "Failed"}</td>
        <td>${s.email}</td>
        <td>${s.contact}</td>
        <td>${s.timestamp}</td>
      </tr>
    `;
  });

  table += "</table>";
  container.innerHTML = table;
}

// Download PDF
function downloadAllStudentsPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Enrolled Students - Tagudin National High School", 14, 20);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

  const rows = enrolledStudents.map(s => [
    `${s.lastName}, ${s.firstName} ${s.middleName}`,
    s.course,
    `${s.score}/100`,
    s.passed ? "Accepted" : "Failed",
    s.email,
    s.contact,
    s.timestamp
  ]);

  doc.autoTable({
    head: [['Name', 'Course', 'Score', 'Status', 'Email', 'Contact', 'Date']],
    body: rows,
    startY: 40
  });

  doc.save("TNHS_Enrolled_Students.pdf");
}

// Admin logout
function goBackToLogin() {
  document.getElementById("adminDashboard").style.display = "none";
  document.getElementById("adminLogin").style.display = "block";
  document.getElementById("adminPass").value = "";
  document.getElementById("loginError").style.display = "none";
}