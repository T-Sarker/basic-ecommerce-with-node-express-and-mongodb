const proModel = require('../models/ProductModel')

exports.allFilter = async (req, res) => {
  //getting the values from ajax post request
  const cat = req.body.category
  const pfilter = req.body.filter.trim()
  const sizefilter = req.body.size.trim()
  var result = ''
  var products = ''

  //laying the conditional requirements to show the exact data

  //check if the pfilter is null //if so then go to 404 page
  if (pfilter != '' && sizefilter == '') {
    //getting the products 
    if (pfilter == 'High-low') {
      let query = {
        category: cat.trim()
        
      }
      products = await proModel.find(query).sort({
        price: -1
      })

    } else if (pfilter == 'Low-High'){
        let query = {
          category: cat.trim(),
        }
        products = await proModel.find(query).sort({
          price: 1
        })
        
      }
  } else if (pfilter == '' && sizefilter != '') {
    console.log('here');
    let query = {
      category: cat.trim(),
      sizes: {
        '$regex': sizefilter
      },
    }
    products = await proModel.find(query).sort({
      price: 1
    })
  } else if (pfilter != '' && sizefilter != ''){
    if (pfilter == 'High-low') {
      let query = {
        category: cat.trim(),
        sizes: {
          '$regex': sizefilter
        },
        
      }
      products = await proModel.find(query).sort({
        price: -1
      })

    } else if (pfilter == 'Low-High'){
        let query = {
          category: cat.trim(),
          sizes: {
            '$regex': sizefilter
          },
        }
        products = await proModel.find(query).sort({
          price: 1
        })
        
      }
  }
  if (products!= '') {
    products.forEach(product => {
      result += '<div class="col-md-3">\
                          <p class="d-none pCat" data=" ' + product.category + '"></p>\
                          <div href="#" class="card card-product-grid">\
                            <a href="#" class="img-wrap"> <img src="/uploads/' + product.images[0] + '"> </a>\
                            <figcaption class="info-wrap">\
                              <a href="#" class="title" style="text-decoration:none">\
                                ' + product.name + '\
                              </a>\
                              <div class="rating-wrap">\
                                <ul class="rating-stars">\
                                  <li style="width:80%" class="stars-active">\
                                    <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>\
                                  </li>\
                                  <li>\
                                    <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>\
                                  </li>\
                                </ul>\
                                <span class="label-rating text-muted"> 34 reviws</span>\
                              </div>\
                              <div class="price mt-1"><b>৳</b> ' + product.price + '</div> </figcaption>\
                          </div>\
                        </div>'
    });

  } else {

  }
  res.send(result)


}
