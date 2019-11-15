@extends('layouts.app')
@section('content')
          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">{{isset($lang) ? ucfirst($lang) : ''}} Formatter</h1>
            <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
          </div>

          

          <!-- Content Row -->

          <div class="row">

            <!-- Area Chart -->
            <div class="col-xl-9 col-lg-7">
              <div class="card shadow mb-4">
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
                <div class="card-body">
                  <div class="chart-area box">
                    <pre id="editor"></pre>
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
                        <label>Language</label>
                        <select class="form-control" id="lang">
                          <option value="html">HTML</option>
                          <option value="javascript">Javascript</option>
                          <option value="php">PHP Alpha</option>
                          <option value="css">CSS</option>
                          <option value="json">JSON</option>
                          <option value="xml">XML</option>
                          <option value="markdown">Markdown</option>
                          <option value="graphql">GraphQL</option>
                          <option value="yaml">YAML</option>
                          <option value="typescript">Typescript</option>
                          <option value="pug" disabled="disabled">Pug Beta</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label>Action</label>
                        <select class="form-control" id="action" disabled="disabled">
                          <option value="formate" selected>Format</option>
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
                      <!-- <div class="form-group">
                        <label>Encoding</label>
                        <select class="form-control" id="encoding">
                          <option value="2">2 spaces per Indend Level</option>
                          <option value="3">3 spaces per Indend Level</option>
                          <option value="4">4 spaces per Indend Level</option>
                          
                        </select>
                      </div> -->
                      <button class="btn btn-success btn-block adp-format">Format</button>
                    </form>
                  </div>
                  <!-- <div class="mt-4 text-center small">
                    <span class="mr-2">
                      <i class="fas fa-circle text-primary"></i> Direct
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-circle text-success"></i> Social
                    </span>
                    <span class="mr-2">
                      <i class="fas fa-circle text-info"></i> Referral
                    </span>
                  </div> -->
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
        