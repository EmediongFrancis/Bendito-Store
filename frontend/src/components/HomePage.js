import React from 'react'

const HomePage = () => {
  return (
    <div className='container container-fluid'>
        <h1 id="products_heading">Latest Products</h1>

        <section id="products" class="container mt-5">
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-3 my-3">
          <div class="card p-3 rounded">
            <img
              alt='product'
              class="card-img-top mx-auto"
              src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">
                <a href="dddf">128GB Solid Storage Memory card - SanDisk Ultra</a>
              </h5>
              <div class="ratings mt-auto">
                <div class="rating-outer">
                  <div class="rating-inner"></div>
                </div>
                <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p class="card-text">$45.67</p>
              <a href="sddad" id="view_btn" class="btn btn-block">View Details</a>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-3 my-3">
          <div class="card p-3 rounded">
            <img
              alt='product'
              class="card-img-top mx-auto"
              src="https://m.media-amazon.com/images/I/61B04f0ALWL._AC_UY218_.jpg"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">
                <a href="vfmkfkvm"
                  >Wyze Cam 1080p HD Indoor Wireless Smart Home Camera Wyze Cam 1080p HD Indoor Wireless Smart Home Camera</a
                >
              </h5>
              <div class="ratings mt-auto">
               <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
                <i class="fa fa-star-o"></i>
                <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p class="card-text">$965.67</p>
              <a href="gffdf" id="view_btn" class="btn btn-block">View Details</a>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-3 my-3">
          <div class="card p-3 rounded">
            <img
              alt='product'
              class="card-img-top mx-auto"
              src="https://m.media-amazon.com/images/I/813oF-FY01L._AC_UY218_.jpg"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">
                <a href="vfdv"
                  >Fujifilm Instax Mini Instant Film Twin Pack (White)</a
                >
              </h5>
              <div class="ratings mt-auto">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
                <i class="fa fa-star-o"></i>
                <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p class="card-text">$125.57</p>
              <a href="feef" id="view_btn" class="btn btn-block">View Details</a>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-3 my-3">
          <div class="card p-3 rounded">
            <img
                alt='product'
              class="card-img-top mx-auto"
              src="https://m.media-amazon.com/images/I/61pBvlYVPxL._AC_UY218_.jpg"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">
                <a href="ffdsd">AmazonBasics High-Speed HDMI Cable</a>
              </h5>
              <div class="ratings mt-auto">
               <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
                <i class="fa fa-star-o"></i>
                <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p class="card-text">$75.56</p>

              <a type="button" href="fdsd" id="view_btn" class="btn btn-block">View Details</a>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-3 my-3">
          <div class="card p-3 rounded">
            <img
              alt='Product'
              class="card-img-top mx-auto"
              src="https://m.media-amazon.com/images/I/61pBvlYVPxL._AC_UY218_.jpg"/>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">
                <a href="sdsd">AmazonBasics High-Speed HDMI Cable, 6 Feet</a>
              </h5>
              <div class="ratings mt-auto">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
                <i class="fa fa-star-o"></i>
                <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p class="card-text">$75.56</p>
              <a href="dsfs" id="view_btn" class="btn btn-block">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    </div>
  )
}

export default HomePage