
function ApplicationCreationForm(props){
  return (
  
  <div className="container mt-5 mb-auto">
      
  <div className="row mb-2">
      {/* Application Section*/}
      <div className="col-md-4">
          <div className="col mb-5">
              <span className="h3"> Adopting for</span>
          </div>

          <div className="mb-3">
       
              <img /*src={img} REPLACE WHEN FINISHED */ alt="Pet you are applying right now" className="img-fluid mx-auto d-block "/>
          </div>
      
      </div>
      
      {/*<!-- Form Section -->*/}
      <div className="col-md-7 ms-auto">
          <div className = "col md-auto mb-3">
              <span className="h3"> Applicant's information: </span>
          </div>

          <form id ="adoption_form" onSubmit={props.function}>
              <div className="mb-3">
                  <label for="userName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="userName" placeholder="Enter your name" required/>
              </div>
              <div className="mb-3">
                  <label for="userEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="userEmail" placeholder="Enter your email" required/>
              </div>
              <div className="mb-4">
                  <label for="experience" className="form-label">Prior Experience</label>
                  <textarea className="form-control" id="experience" rows="3" placeholder="Describe your prior experience with pets" required></textarea>
              </div>
             
              <button type="submit" className="btn btn-light" id = "button" >Submit</button>

  
          </form>
      </div>
  </div>
</div>
  )};
export default ApplicationCreationForm;