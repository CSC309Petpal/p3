// import React, { useState, useEffect, useMemo } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';

// import { BACKENDHOST } from "../../config";

// function range(start, end) {
//     return [...Array(end - start + 1).keys()].map(i => i + start);
// }

// function to_url_params(object) {
//     const params = new URLSearchParams();
//     for (const key in object) {
//         if (Array.isArray(object[key])) {
//             object[key].forEach(value => params.append(`${key}[]`, value));
//         } else {
//             params.append(key, object[key]);
//         }
//     }
//     return params.toString();
// }

// const PetListing = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const navigate = useNavigate();
//     const [totalPages, setTotalPages] = useState(1);
//     const [pets, setPets] = useState([]);

//     const query = useMemo(() => ({
//         page: parseInt(searchParams.get('page') ?? 1),
//         shelter: searchParams.get('shelter') ?? '',
//         size: searchParams.get('size') ?? '',
//         ordering: searchParams.get('orderBy') ?? 'name',
//     }), [searchParams]);

//     useEffect(() => {
//         const params = to_url_params(query);
//         fetch(`${BACKENDHOST}/pets/?${params}`)
//             .then(response => response.json())
//             .then(data => {
//                 setPets(data.results);
//                 const totalPages = Math.ceil(data.count / 6);
//                 setTotalPages(totalPages);
//             })
//             .then(json => {
//                 setPets(json.data);
//                 setTotalPages(json.meta.total_pages);
//             })
//             .catch(error => console.error('Error:', error));
//     }, [query]);

//     const handleDetail = (id) => {
//         navigate(`/pet/${id}`);
//     };

//     return (
//         <>
            
//             <div className="side-panel">
//                 {/* Filtering and Sorting Options */}
//                 <div className="filter-group">
//                     <p>Filter by Shelter:</p>
//                     <select onChange={(e) => setSearchParams({ ...query, shelter: e.target.value, page: 1 })}>
//                         <option value="">Select Shelter</option>
//                         {/* Populate with actual shelter options */}
//                     </select>
//                 </div>
//                 <div className="filter-group">
//                     <p>Filter by Size:</p>
//                     <select onChange={(e) => setSearchParams({ ...query, size: e.target.value, page: 1 })}>
//                         <option value="">Select Size</option>
//                         <option value="small">Small</option>
//                         <option value="medium">Medium</option>
//                         <option value="large">Large</option>
//                     </select>
//                 </div>
//                 <div className="filter-group">
//                     <p>Order By:</p>
//                     <select onChange={(e) => setSearchParams({ ...query, ordering: e.target.value, page: 1 })}>
//                         <option value="name">Name</option>
//                         <option value="age">Age</option>
//                     </select>
//                 </div>
//             </div>
//             {/* Pet Cards */}
//             <div className="row">
//                 {pets.map((pet, index) => (
//                     <div key={index} className="col-md-4">
//                         <div className="card">
//                             <img src={pet.image} className="card-img-top fixed-img" alt={`Pet ${index + 1}`} />
//                             <div className="card-body">
//                                 <h5 className="card-title">{pet.name}</h5>
//                                 <p className="card-text">{pet.status}</p>
//                                 <button className="btn btn-primary" onClick={() => handleDetail(pet.id)}>View Details</button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             {/* Pagination */}
//             <div className="pagination">
//                 <button disabled={query.page <= 1} onClick={() => setSearchParams({ ...query, page: query.page - 1 })}>
//                     Previous
//                 </button>
//                 <button disabled={query.page >= totalPages} onClick={() => setSearchParams({ ...query, page: query.page + 1 })}>
//                     Next
//                 </button>
//                 <p>Page {query.page} out of {totalPages}.</p>
//             </div>
//         </>
//     );
// };

// export default PetListing;
