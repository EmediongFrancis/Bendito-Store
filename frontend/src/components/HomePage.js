import React, { Fragment, useEffect } from 'react'
import MetaData from './layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'

const HomePage = () => {

  const dispatch = useDispatch();

  const { products, loading, error, productsCount } = useSelector(state => state.product);

  useEffect(() => {

    dispatch(getProducts());
  }, [dispatch])

  return (
    <Fragment>
      <MetaData title={'Buy Quality Products'} />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products && products.map(product => (
            <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                alt='product'
                className="card-img-top mx-auto"
                src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a href="dddf">128GB Solid Storage Memory card - SanDisk Ultra</a>
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
                </div>
                <p className="card-text">$45.67</p>
                <a href="sddad" id="view_btn" className="btn btn-block">View Details</a>
              </div>
            </div>
          </div>
          ))}
          

        </div>
      </section>
    </Fragment>
  )
}

export default HomePage