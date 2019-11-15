@extends('layouts.app')
@section('content')
<style>
  .formatter-home .card i {
    font-size: 138px;
    display: block;
    padding: 1rem 2rem 0 2rem;
    line-height: 1;
}
</style>
          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">{{isset($lang) ? ucfirst($lang) : ''}} Formatter</h1>
            <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
          </div>

          

          <!-- Content Row -->

          <div class="row">

            <!-- Area Chart -->
            <div class="col-xl-9 col-lg-7 formatter-home">

                <div class="card mb-3" >
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <!-- <img src="..." class="card-img" alt="..."> -->
                      <i class="fab fa-html5"></i>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">HTML Formatter</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>  
                <div class="card mb-3" >
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <i class="fab fa-css3"></i>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">CSS Formatter</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>  
                <div class="card mb-3" >
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <i class="fab fa-js"></i>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">Javascript Formatter</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>  
                <div class="card mb-3" >
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <i class="fab fa-sass"></i>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">SASS Formatter</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>      
                <div class="card mb-3" >
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <i class="fab fa-markdown"></i>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">Markdown Formatter</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>      
<div class="card mb-3" >
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <i class="fab fa-sass"></i>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">SASS Formatter</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>      
<div class="card mb-3" >
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <i class="fab fa-sass"></i>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">SASS Formatter</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>      
<div class="card mb-3" >
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <i class="fab fa-sass"></i>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">SASS Formatter</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>      
<div class="card mb-3" >
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <i class="fab fa-sass"></i>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">SASS Formatter</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>      
<div class="card mb-3" >
                  <div class="row no-gutters">
                    <div class="col-md-4">
                      <i class="fab fa-sass"></i>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">SASS Formatter</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                    </div>
                  </div>
                </div>      


            </div>

            <!-- Pie Chart -->
            <div class="col-xl-3 col-lg-5">
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <input type="hidden" id="init_lang" value="{{isset($lang) ? $lang : ''}}">
                  <h6 class="m-0 font-weight-bold text-primary">Options</h6>
                  <div class="dropdown no-arrow">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                      <div class="dropdown-header">Dropdown Header:</div>
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>
                </div>
                <!-- Card Body -->

                <div class="card-body">
                  <div class="chart-pie pb-2">
                    
                  </div>
                 
                </div>
              </div>
            </div>
          </div>

          <!-- Content Row -->
          <div class="row"  id="resultBox">

            <!-- Content Column -->
            <div class="col-lg-9 mb-4">

              <!-- Project Card Example -->
              <div class="card shadow mb-4">
                <div class="card-header" style="padding: 0.5rem 1.25rem;">
                  <h6 class="m-0 font-weight-bold text-primary" style="line-height: 2">Result
                    <div class="btn-group float-right btn-group-sm" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-secondary btn-success copy"><i class="fas fa-copy"></i> Copy</button>
                      <button type="button" class="btn btn-secondary btn-success download"><i class="fas fa-download"></i> Download</button>
                      <!-- <button type="button" class="btn btn-secondary btn-success">Right</button> -->
                    </div>
                  </h6>

                </div>
                <div class="card-body">
                  <div class="box">
                     <div class="box-progress">
                        <i class="fas fa-circle-notch fa-spin"></i>
                     </div>
                    <pre id="editorResult"></pre>
                  </div>
                </div>
              </div>

            </div>

            <div class="col-lg-3 mb-4">

              <!-- Illustrations -->
              <!-- <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Illustrations</h6>
                </div>
                <div class="card-body">
                  <div class="text-center">
                    <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" style="width: 25rem;" src="img/undraw_posting_photo.svg" alt="">
                  </div>
                  <p>Add some quality, svg illustrations to your project courtesy of <a target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a constantly updated collection of beautiful svg images that you can use completely free and without attribution!</p>
                  <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on unDraw &rarr;</a>
                </div>
              </div> -->

              <!-- Approach -->
              <!-- <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Development Approach</h6>
                </div>
                <div class="card-body">
                  <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce CSS bloat and poor page performance. Custom CSS classes are used to create custom components and custom utility classes.</p>
                  <p class="mb-0">Before working with this theme, you should become familiar with the Bootstrap framework, especially the utility classes.</p>
                </div>
              </div>

            </div>
          </div> -->

          <!-- Modal Section -->
         


@endsection
        