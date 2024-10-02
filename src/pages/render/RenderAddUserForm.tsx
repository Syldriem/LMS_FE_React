import { ReactElement, useContext, useEffect, useState } from "react";
import { ApiDataContext } from "../../context/ApiDataProvider";

export function AddUserForm(): ReactElement {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [courseid, setCourseId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { courses, createUser,courseIds } = useContext(ApiDataContext);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password || !email || !role) {
      setError("All fields are required!");
      return;
    }

    


    

    const userData = {
      username: username,
      password: password,
      email: email,
      role: role,
      courseID: courseid || "",
    };

    console.log(userData)



    try {
      await createUser(userData);
      setError(null); // Clear error on successful submission
      console.log("User data submitted successfully:", userData);
    } catch (err) {
      setError("Error creating user, please try again.");
      console.error("Error creating user:", err);
    }
  };
  
  const [selectedCourseName, setSelectedCourseName] = useState<string>('');

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const courseName = e.target.value;
    setSelectedCourseName(courseName);

    // Find the course object based on the selected name
    const selectedCourse = courses?.find(course => course.name === courseName);

    console.log(selectedCourse?.id);

    // Set the ID of the selected course
    if(selectedCourse)
    setCourseId(selectedCourse.id);
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="form-group">
          <label htmlFor="formGroupExampleInput">User Name</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="InputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="InputPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailinput">Email address</label>
          <input
            className="form-control"
            type="email"
            id="emailinput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="inputState">Role</label>
          <select
            id="inputState"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Role...</option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <div className="form-group">
  <label htmlFor="inputState">Course</label>
  <select
    id="inputState"
    className="form-control"
    value={courseid}  // The selected courseId from state
    onChange={(e) => {
      const selectedCourseId = e.target.value;  // Get the selected course ID
      setCourseId(selectedCourseId);  // Update the courseId in state
      console.log("Selected Course ID:", selectedCourseId);  // Log the course ID
    }}
  >
    <option value="">Select a course</option>
    {courses?.map((course) => (
      <option key={course.id} value={course.id}>
        {course.name}  {/* Display course name in dropdown */}
      </option>
    ))}
  </select>
</div>

{courseid && (
  <div>
    <p>Selected Course ID: {courseid}</p>
  </div>
)}

        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
    </>
  );
}
