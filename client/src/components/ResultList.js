import React from "react";

function ResultList(props) {
  return (
    <ul className="list-group">
      {props.results.map(result => (
        <li className="list-group-item" key={result.id}>
          <img alt={result.title} className="img-fluid" src={result.images.original.url} />
        </li>
      ))}
    </ul>
  );
}



// {this.state.bookresults.length ? (
//   <BookList>
//     {this.state.bookresults.map(bookresult =>  (
//       <BookListItem 
//       key={bookresult._id}
//       title={bookresult}
//       href={bookresult.href}
      
//       >
//         <Link to={"/books/" + bookresult._id}>
//           <strong>
//             {bookresult.title} by {bookresult.author}
//           </strong>
//         </Link>
      
//       </BookListItem>
//     ))}
//   </BookList>
// ) : (
  
//     <h3>No Results to Display</h3>
//   )}

export default ResultList;
