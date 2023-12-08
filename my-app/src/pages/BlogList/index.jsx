import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { BACKENDHOST } from "../../config";
import img from '../../assets/logo.png';
import { useParams } from 'react-router-dom';
import './style.css';

function to_url_params(object) {
    const params = new URLSearchParams();
    for (const key in object) {
        if (Array.isArray(object[key])) {
            object[key].forEach(value => params.append(`${key}[]`, value));
        } else {
            params.append(key, object[key]);
        }
    }
    return params.toString();
}

const BlogListing = () => {
    
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const {shelterId} = useParams();

    const handleDetail = (id) => {
        navigate(`/blog/${id}`);
    }

    const goHome = (id) => {
        navigate(`/shelterHome`);
    }

    const query = useMemo(() => ({
        page: parseInt(searchParams.get('page') ?? 1),
    }), [searchParams]);


    useEffect(() => {
      const params = to_url_params(query);
      const token = localStorage.getItem('token');
      fetch(`${BACKENDHOST}blog/shelter/${shelterId}/?${params}`, {
        method: 'GET', // or 'POST', 'PUT', 'DELETE', etc.
        headers: {
          'Authorization': `Bearer ${token}`,
          // other headers...
        },
      })
          .then(response => response.json())
          .then(data => {
            
              setBlogs(data.results);
              const totalPages = Math.ceil(data.count / 4);
              setTotalPages(totalPages);
          })
          .catch(error => console.error('Error fetching blogs:', error));
  }, [query]);

    return (
      <>
      <Header />
      <div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>
    <div className="pagination d-flex justify-content-center" style={{ width: '100%' }}>

    <button 
        onClick={() =>goHome()}
        className="btn btn-secondary m-1"
    >Back to previous page</button>
    <button 
        disabled={query.page <= 1} 
        onClick={() => setSearchParams({ ...query, page: query.page - 1 })}
        className="btn btn-secondary m-1"
    >
        Previous
    </button>
    <button 
        disabled={query.page >= totalPages} 
        onClick={() => setSearchParams({ ...query, page: query.page + 1 })}
        className="btn btn-secondary m-1"
    >
        Next
    </button>
    <p className="m-1">Page {query.page} out of {totalPages}.</p>
</div>
      <div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>
    <div className="container mt-4">
      <div className="row justify-content-center">
        {blogs.map(blog => (
          <div key={blog.id} className="card mb-3 col-12 col-md-10 col-lg-8">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={blog.image ? blog.image : img} className="img-fluid rounded-start blog-image" alt={blog.title} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text"><small className="text-muted">Last updated {blog.created}</small></p>
                  <button className="btn btn-primary" onClick={()=>handleDetail(blog.id)}>Read More</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      <div className="container">
        <div className="row" style={{height: 4 + "rem"}}>
            
        </div>

    </div>
      <Footer />
  </>
    );
};

export default BlogListing;
