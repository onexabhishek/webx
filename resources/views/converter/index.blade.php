@extends('layouts.app')
@section('content')
          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">{{isset($from) ? ucfirst($from) : ''}}-{{isset($to) ? ucfirst($to) : ''}} Converter</h1>
            <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
          </div>

          

          <!-- Content Row -->
          <section class="app-converter shadow">
             <div class="row no-gutters">

                <!-- Area Chart -->
                <div class="col-xl-5 col-lg-5">
                  <div class="card mb-4">
                    <!-- Card Header - Dropdown -->
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 class="m-0 font-weight-bold text-primary">Past Your Code</h6>
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
                    <div class="card-body converter">
                      <div class="chart-area box">
                        <pre id="editorFrom"></pre>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="col-xl-2 col-lg-2">
                  <div class="card option mb-4">
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
                        
                          <div class="form-group">
                            <label>Load Url</label>
                            <button type="text" class="btn btn-primary btn-block" name="load_url"data-toggle="modal" data-target="#urlModal"><i class="fas fa-link"></i>&nbsp; Enter Url</button>
                          </div>
                          <div class="form-group">
                            <label>Open File</label>
                            <button type="text" class="btn btn-primary btn-block" name="choose_file" id="ChooseFile" data-toggle="modal" data-target="#fileModal"><i class="fas fa-file"></i>&nbsp; Choose File</button>
                          </div>
                        <form>
                          <div class="form-group">
                            <label>Converter</label>
                            <select class="form-control" id="converter">
                              <option value="pug,html">Pug to HTML</option>
                              <option value="yaml,javascript">YAML to Javascript</option>
                              <option value="sass,css">Sass to Css</option>
                              <option value="image,pdf">Image to PDF</option>
                              <option value="image,word">Image to Word</option>
                              <option value="image,text">Image to Text</option>
                              <option value="url,pdf">Webpage to PDF</option>
                            </select>
                          </div>
                          <div class="form-group">
                            <label>Action</label>
                            <select class="form-control" id="action" disabled="disabled">
                              <option value="convert" selected>Convert</option>
                              <option value="minify">Minify</option>
                            </select>
                          </div>
                           <div class="form-group">
                            <label>Indentation level</label>
                            <select class="form-control" id="indend">
                              <option value="2">2 spaces per Indend Level</option>
                              <option value="3">3 spaces per Indend Level</option>
                              <option value="4">4 spaces per Indend Level</option>
                              <option value="5">5 spaces per Indend Level</option>
                              <option value="6">6 spaces per Indend Level</option>
                              <option value="7">7 spaces per Indend Level</option>
                              <option value="8">8 spaces per Indend Level</option>
                              <option value="9">9 spaces per Indend Level</option>
                              <option value="10">10 spaces per Indend Level</option>
                            </select>
                          </div>
                          
                          <button class="btn btn-success btn-block adp-convert">Convert</button>
                        </form>
                      </div>
                      
                    </div>
                  </div>
                </div>


                <!-- Pie Chart -->
                <div class="col-xl-5 col-lg-5" id="resultBox">
                  <div class="card mb-4">
                    <div class="card-header" style="padding: 0.59rem 1.25rem;">
                      <h6 class="m-0 font-weight-bold text-primary" style="line-height: 2">Result
                        <div class="btn-group float-right btn-group-sm" role="group" aria-label="Basic example">
                          <button type="button" class="btn btn-secondary btn-success copy"><i class="fas fa-copy"></i> Copy</button>
                          <button type="button" class="btn btn-secondary btn-success download"><i class="fas fa-download"></i> Download</button>
                          <!-- <button type="button" class="btn btn-secondary btn-success">Right</button> -->
                        </div>
                      </h6>

                    </div>
                    <div class="card-body converter">
                      <div class="box">
                         <div class="box-progress">
                            <i class="fas fa-circle-notch fa-spin"></i>
                         </div>
                        <pre id="editorResult"></pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
         </section>

        

          <!-- Modal Section -->
         

          <!-- The Modal -->
          <div class="modal fade" id="urlModal">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
              
                <!-- Modal Header -->
                <div class="modal-header">
                  <h4 class="modal-title">Load Url</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <form class="urlModal">
                <!-- Modal body -->
                <div class="modal-body">
                  
                    <div class="form-group">
                      <label for="loadUrl" class="sr-only">Enter Url</label>
                      <input type="text" class="form-control" id="loadUrl" placeholder="Enter Url">
                    </div>
                  
                </div>
                
                <!-- Modal footer -->
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                </form>
              </div>
            </div>
          </div>
           <!-- The Modal -->
          <div class="modal fade" id="fileModal">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
              
                <!-- Modal Header -->
                <div class="modal-header">
                  <h4 class="modal-title">Load File</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                  <!-- cvnjdfkgh -->
                  <iframe src="{{asset('loadfile')}}" id="loadFileFrame"></iframe>
              </div>
            </div>
          </div>
@endsection
        