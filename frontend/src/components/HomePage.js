import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import Product from './products/Product'
import Loader from './layout/Loader'
import Pagination from 'react-js-pagination';


import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import { useAlert } from 'react-alert'

const HomePage = () => {

  const { currentPage, setCurrentPage } = useState(1)

  const alert = useAlert()

  const dispatch = useDispatch();

  const { products, loading, error, productsCount, resultsPerPage } = useSelector(state => state.product);

  useEffect(() => {

    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(currentPage));

  }, [dispatch, error, alert, currentPage]);

  function setCurrentPageNo(page) {
    setCurrentPage(page);
  }

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Buy Quality Products'} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map(product => (
                <Product key={product._id} product={product} />
              ))}

            </div>
          </section>

          <div className='d-flex justify-content-center mt-5'>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultsPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText={'Next'}
              prevPageText={'Prev'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass='page-item'
              linkClass='page-link'
            />
          </div>
        </Fragment>
      )}

    </Fragment>
  )
}

export default HomePage