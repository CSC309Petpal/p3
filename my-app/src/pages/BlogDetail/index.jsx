import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKENDHOST } from '../../config';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';
import logo from '../../assets/logo.png';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const BlogCreate = () => {
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [img_not, setImg_not] = useState('');

  const {blogId} = useParams();

  const navigate = useNavigate();

    
  useEffect(() => {
    // Define the function to fetch shelter information
    async function fetchBlog() {
      try {
        const response = await fetch(`${BACKENDHOST}blog/${blogId}/`);
        if (response.ok) {
          const data = await response.json();
          if (data.image === null) {
            data.image = logo;
          }

            setBlog(data); // Update the state with shelter information
        } else {
          // Handle HTTP errors
          console.error("HTTP Error: " + response.status);
        }
      } catch (error) {
        // Handle fetch errors
        navigate('/404');
        console.error("Fetch error:", error);
      }
    }

    fetchBlog(); // Call the function to fetch shelter information
  }, []); // Dependency array to re-fetch data if shelterId changes

  return (
<>
  <Header />
  <div className="container" style={{height: 4 + "rem"}}>
      

      </div>

  {/* Use Bootstrap classes for spacing instead of inline styles */}
  <div className="container">
    
    {/* Image Row */}
    <div className="row justify-content-center mb-4">
      <div className="col-lg-6 col-md-8">
        {/* Responsive image */}
        <img src={blog.image} className="img-fluid" alt="Blog post"/>
      </div>
    </div>

    {/* Content Row */}
    <div className="row justify-content-center mb-4">
  <div className="col-12 col-md-8 col-lg-6">
    <div className="card" style={{ maxHeight: '600px', overflowY: 'auto' }}>
      <div className="card-body text-center">
        <h1 className="card-title mb-3">{blog.title}</h1>
        <p className="card-text lead">{blog.content}</p>
      </div>
    </div>
  </div>
</div>

  </div>

    <div className="container" style={{height: 4 + "rem"}}>
      

  </div>
    

  <Footer />
</>

  );
};

export default BlogCreate;
