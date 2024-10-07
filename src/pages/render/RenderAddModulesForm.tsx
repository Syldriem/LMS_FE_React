import React, { ReactElement, useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported
import { ApiDataContext } from '../../context/ApiDataProvider';

export function AddModuleForm(): ReactElement {
    const { createModule,course } = useContext(ApiDataContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [error, setError] = useState<string | null>(null);

  // Initialize state with the default values



  // Handle form submit
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData= {
        name: name,
        description: description,
        start: start,
        end: end,
        courseID: course?.id!
      };

      try {
        await createModule(formData);
        setError(null); // Clear error on successful submission
        console.log("User data submitted successfully:", formData);
      } catch (error) {
        setError("Error creating user, please try again.");
        console.error("Error creating user:", error);
      }


    console.log('Form Data Submitted:', formData);


  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          className="form-control"
          id="name"
          placeholder="Enter module name"
          required
        />
      </div>

            <div className="form-group mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            className="form-control"
            id="description"
            placeholder="Enter module description"
            required
        />
        </div>


      <div className="form-group mb-3">
        <label htmlFor="start" className="form-label">Start Date</label>
        <input
          type="date"
          name="start"
          value={start}
          onChange={(e) => setStart(e.target.value)} 
          className="form-control"
          id="start"
          required
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="end" className="form-label">End Date</label>
        <input
          type="date"
          name="end"
          value={end}
          onChange={(e) => setEnd(e.target.value)} 
          className="form-control"
          id="end"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

