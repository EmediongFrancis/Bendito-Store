import React, { Fragment, useEffect } from 'react'
import MetaData from './layout/MetaData'
import Product from './products/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import { useAlert } from 'react-alert'

const HomePage = () => {

  const alert = useAlert()

  const dispatch = useDispatch();

  const { products, loading, error, productsCount } = useSelector(state => state.product);

  useEffect(() => {

    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts());

  }, [dispatch, error, alert]);

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
        </Fragment>
      )}

    </Fragment>
  )
}

export default HomePage