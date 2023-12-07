import React, { useState } from 'react';

function ApplicationCreationForm(props) {
  // Rename 'experience' to 'details' to match the textarea id
  const [formData, setFormData] = useState({
    details: ''
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(formData); // Pass formData on submit
  };

  return (
    <div className="container mt-5 mb-auto">
      <form onSubmit={handleSubmit}>
        {/* Details textarea */}
        <div className="mb-4">
          <label htmlFor="details" className="form-label">Prior Experience</label>
          <textarea
            className="form-control"
            id="details"
            rows="3"
            placeholder="Describe your prior experience with pets"
            value={formData.details} // Update to use formData.details
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-light" id="button">Submit</button>
      </form>
    </div>
  );
}

export default ApplicationCreationForm;
