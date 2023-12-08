import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKENDHOST } from '../../config';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const BlogCreate = () => {
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    image: '',
  });
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [img_not, setImg_not] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'image') {
        const file = event.target.files[0];
        if (file) {
            // Check if the file is an image
            if (!file.type.startsWith('image/')) {
                setImg_not('Please select an image file.');
                return; // Exit the function if not an image
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setBlog({ ...blog, image: file });
            };
            reader.readAsDataURL(file);
        }
    }
    setBlog({ ...blog, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(blog).forEach(key => {
        if (key === 'image') {
            // If the key is 'image' and it's a File object, append the file
            if (blog[key] instanceof File) {
                data.append(key, blog[key]);
            }
        } else {
            // If the key is not 'image' and the value is not an empty string,
            // append the key-value pair to the formData
            data.append(key, blog[key]);
        }
        });

    
    const token = localStorage.getItem('token');
    fetch(`${BACKENDHOST}blog/`, {
        method: 'POST', // or 'POST', 'PUT', 'DELETE', etc.
        headers: {
          'Authorization': `Bearer ${token}`,
          // other headers...
        },
        body: data
      })
        .then(response => {
            if (response.status === 201) {
                navigate('/shelterHome');
            } else {
                alert('Failed to create blog.');
            }

        })
        .catch(error => console.error('Error:', error))
  };

  return (
    <>
    <Header />
    <div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>
    <div className="container mt-5 align-content-center text-center">
  <h1 className="mb-4">Create a Blog</h1>
  <form onSubmit={handleSubmit}>


            {/* <img src={petInfo.image} alt={petInfo.name} className="img-fluid mb-3" /> */}
            {imagePreview && (
                        <img src={imagePreview} alt="Blog" className="img-fluid mb-3" />
                    )}
                    <div className="mb-3">
                    <p id="img_not" style={{color: "red"}}> { img_not }</p>
              <label htmlFor="image" className="form-label">Blog Image</label>
              <input
                id="image"
                type="file"
                name="image"
                onChange={handleChange}
                className="form-control"
              />
            </div>

    <div className="mb-3">
      <h3 htmlFor="title" className="form-label">Title</h3>
      <input
        type="text"
        id="title"
        name="title"
        value={blog.title}
        onChange={handleChange}
        className="form-control"
        placeholder="Enter your blog title"
        required
      />
    </div>
    <div className="mb-3">
      <h3 htmlFor="content" className="form-label">Content</h3>
      <textarea
        id="content"
        name="content"
        value={blog.content}
        onChange={handleChange}
        className="form-control"
        rows="10"
        placeholder="Write your blog content here"
        required
      ></textarea>
    </div>
    <button type="submit" className="btn btn-primary">Create Post</button>
  </form>
</div>

<div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>
    <Footer/>
    </>
  );
};

export default BlogCreate;
