<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Adptool V1.0</div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <!-- <li class="nav-item active">
        <a class="nav-link" href="index.html">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Formatter</span></a>
      </li> -->
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i class="fas fa-align-justify"></i>
          <span>Formatter</span>
        </a>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">All Formatters:</h6>
            <a class="collapse-item" href="<?=asset('html-formatter');?>">HTML Formatter</a>
            <a class="collapse-item" href="<?=asset('css-formatter');?>">CSS Formatter</a>
            <a class="collapse-item" href="<?=asset('javascript-formatter');?>">Javascript Formatter</a>
            <a class="collapse-item" href="<?=asset('php-formatter');?>">PHP Formatter</a>
            <a class="collapse-item" href="<?=asset('json-formatter');?>">JSON Formatter</a>
            <a class="collapse-item" href="<?=asset('xml-formatter');?>">XML Formatter</a>
            <a class="collapse-item" href="<?=asset('markdown-formatter');?>">Markdown Formatter</a>
            <a class="collapse-item" href="<?=asset('graphql-formatter');?>">GraphQl Formatter</a>
            <a class="collapse-item" href="<?=asset('yaml-formatter');?>">YAML Formatter</a>
            <a class="collapse-item" href="<?=asset('typescript-formatter');?>">Typescript Formatter</a>
          </div>
        </div>
      </li>

      <!-- Divider -->
      <!-- <hr class="sidebar-divider"> -->
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#converters" aria-expanded="true" aria-controls="converters">
          <i class="fas fa-exchange-alt"></i>
          <span>Converter</span>
        </a>
        <div id="converters" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">All Converters:</h6>
            <a class="collapse-item" href="<?=asset('pug-to-html');?>">PUG to HTML</a>
            <a class="collapse-item" href="<?=asset('sass-to-css');?>">SASS to CSS</a>
            <a class="collapse-item" href="<?=asset('scss-to-css');?>">SCSS to CSS</a>
            <a class="collapse-item" href="<?=asset('yaml-to-javascript');?>">YAML to Javascript</a>
            <a class="collapse-item" href="<?=asset('jade-to-html');?>">JADE to PUG</a>
            <a class="collapse-item" href="<?=asset('javascript-to-coffeescript');?>">Javascript to Coffeescript</a>
        </div>
      </li>
      <!-- Heading -->
      <div class="sidebar-heading">
        Other Tools
      </div>

      

      <!-- Nav Item - Utilities Collapse Menu -->
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
          <i class="fas fa-fw fa-wrench"></i>
          <span>Web Tools</span>
        </a>
        <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">External Utilities:</h6>
            <a class="collapse-item" href="https://www.adminspress.com/tools/press">Online Editor &nbsp;<i class="fas fa-external-link-alt float-right"></i></a>
            <a class="collapse-item" href="https://www.adminspress.com">Code Gallery &nbsp;<i class="fas fa-external-link-alt float-right"></i></a>
            <!-- <a class="collapse-item" href="utilities-animation.html">Animations</a>
            <a class="collapse-item" href="utilities-other.html">Other</a> -->
          </div>
        </div>
      </li>

      <!-- Divider -->
      <!-- <hr class="sidebar-divider"> -->

      <!-- Heading -->
      <!-- <div class="sidebar-heading">
        Addons
      </div> -->

      <!-- Nav Item - Pages Collapse Menu -->
      <!-- <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i class="fas fa-fw fa-folder"></i>
          <span>Pages</span>
        </a>
        <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <h6 class="collapse-header">Login Screens:</h6>
            <a class="collapse-item" href="login.html">Login</a>
            <a class="collapse-item" href="register.html">Register</a>
            <a class="collapse-item" href="forgot-password.html">Forgot Password</a>
            <div class="collapse-divider"></div>
            <h6 class="collapse-header">Other Pages:</h6>
            <a class="collapse-item" href="404.html">404 Page</a>
            <a class="collapse-item" href="blank.html">Blank Page</a>
          </div>
        </div>
      </li> -->

      <!-- Nav Item - Charts -->
      <!-- <li class="nav-item">
        <a class="nav-link" href="charts.html">
          <i class="fas fa-fw fa-chart-area"></i>
          <span>Charts</span></a>
      </li> -->

      <!-- Nav Item - Tables -->
      <!-- <li class="nav-item">
        <a class="nav-link" href="tables.html">
          <i class="fas fa-fw fa-table"></i>
          <span>Tables</span></a>
      </li>
 -->
      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block">

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>