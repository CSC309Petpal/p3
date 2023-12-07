import React from 'react';

function DisplayApplication() {
  const imageStyle = {
    height: '200px', 
    width: '200px', 
    borderRadius: '100px'
  };

  return (
    <main className="flex-grow-1 align-items-center">
      <div className="container">
        {/* Application Information */}
        <div className="row mt-lg-4">
          <h1 className="text-center">Application Information</h1>
          <h5 className="text-center"><b>Application Status:</b> Pending</h5>
          <hr className="my-4 border-primary"/>
        </div>

        {/* Application Details */}
        <div className="row justify-content-center mt-lg-4">
          {/* Image */}
          <div className="col-md-3 d-flex justify-content-center flex-column align-items-center">
            <img src="logo.png" className="img-fluid mb-sm-3" alt="Responsive" style={imageStyle} />
          </div>

          {/* Data Table */}
          <div className="col-md-8 d-flex justify-content-center">
            <table className="table border border-light table-bordered text-center border-dark">
              {/* Table rows */}
              {/* ... other rows ... */}
            </table>
          </div>
        </div>

        {/* Shelter Information */}
        {/* ... similar structure to Application Details ... */}

        {/* Chat Section */}
        <div className="row mt-lg-4">
          <h1 className="text-center">Chat</h1>
          <hr className="my-4 border-primary"/>
        </div>

        <div className="row">
          {/* ... Chat content ... */}
        </div>
      </div>
    </main>
  );
}

export default DisplayApplication;
