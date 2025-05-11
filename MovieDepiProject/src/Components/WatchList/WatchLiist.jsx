import React from "react";
import "./WatchList.css";

// ! Use Cart
import { useCart } from "react-use-cart";


const WatchLiist = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    // totalItems,
    // cartTotal,
    // updateItemQuantity,
    removeItem,
    emptyCart,

  } = useCart();


  // Change Color For Rate
  const getRate = rate => {
    if (rate > 7) return "#21d07a";
    if (rate >= 5) return "#d2d531";
    return "#db2360";
  }

  if (isEmpty) return <div className="emptyWatch">
    <h1>Watch List <span className="B-bottom">Is Empty</span></h1>
  </div>
  return (
    <>
      <div className="list-details text-center mt-5">
        <h2>cart : <span className="B-bottom"> {totalUniqueItems} </span></h2>
        <button className="btn" style={{
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          color: '#fff'
        }} onClick={() => emptyCart()} >Remove All List</button>
      </div>
      {/* <NavbarMenu /> */}
      <section className="watch-list container">
        {
          items.map(item =>
          (
            <div key={item.id} className="item-list p-3">
              {/* Image and Rate Film */}
              <div className="img-rate-side">
                <div className="img-part">
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    alt={item.title}
                    style={{ width: "100%" }} />
                </div>
                <div className="rate-part d-flex flex-column">
                  <p>Vote Count: <span>{item.vote_count}</span></p>
                  <p>Rate: <span style={{ color: getRate(item.vote_average) }}>{item.vote_average.toFixed(2)}</span></p>
                  <p> Date: <span>{item.release_date}</span></p>
                </div>
              </div>
              {/* // Film description  */}
              <div className="description-side">
                <h3>{item.title}</h3>
                <p>{item.overview}</p>
                <button className="btn mt-4" style={{
                  backgroundColor: 'rgba(255, 0, 0, 0.3)',
                  color: '#fff'
                }} onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          )
          )
        }

      </section>
    </>
  )






  // return (
  //   <>
  //     {/* <NavbarMenu /> */}
  //     <section className="watch-list container">
  //       {
  //         data.map(item => 
  //           (
  //       <div key={item.id} className="item-list p-3">
  //         {/* Image and Rate Film */}
  //         <div className="img-rate-side">
  //           <div className="img-part">
  //             <img src={item.img} alt={item.title} style={{ width: "100%" }} />
  //           </div>
  //           <div className="rate-part d-flex flex-column">
  //           <p>Rate: <span style={{color: getRate(item.rate)}}>{item.rate}</span></p>
  //           <p> Director by <span>{item.director}</span></p>
  //           </div>
  //         </div>
  //         {/* // Film description  */}
  //         <div className="description-side">
  //           <h3>{item.title}</h3>
  //           <p>{item.discription}</p>
  //         </div>
  //       </div>
  //           )
  //         )
  //       }






  //     </section>
  //   </>
  // );
};

export default WatchLiist;
