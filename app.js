var app = angular.module('soham', ['ngRoute']);

app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/36_days_of_type', {
            templateUrl: 'partials/36_days_of_type.html',
            controller: 'HomeCtrl'
        })
        .when('/culturals_website', {
            templateUrl: 'partials/culturals_website.html',
            controller: 'HomeCtrl'
        })
        .when('/token', {
            templateUrl: 'partials/token.html',
            controller: 'HomeCtrl'
        })
        .when('/4th_poster_typo', {
            templateUrl: 'partials/4th_poster_typo.html',
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.hashPrefix('!');
}]);

app.controller('HomeCtrl', ['$scope', '$window', '$location',
    function($scope,$window,$location){
    
    /* active tab
    ----------------------------*/
        
        angular.element($window).bind('scroll', function () {
            if(document.getElementById('home')!=null){ //home page is opened
               var projects_y = elmYPosition('projects');
                var contact_y = elmYPosition('contact');
                var currentY = currentYPosition();
                //projects_y is also the height of the screen
                if(currentY<(projects_y/2)) $scope.act = 1;
                else if(currentY<(contact_y-(projects_y/2))) $scope.act = 2;
                else $scope.act = 3;
                $scope.$apply(); 
            } else{
                //individual pages are opened.
                var contact_y = elmYPosition('contact');
                var end_y = elmYPosition('get_in_touch');//to get an estimate of y of end point
                var currentY = currentYPosition();
                if(currentY>(4*contact_y-3*end_y)) $scope.act = 3;
                else $scope.act = 2;
                $scope.$apply();
            }
            
        });
    /* scrollTo -
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
		$scope.scroll_to = function(eID) {
            // This scrolling function 
            // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
            
            if(eID == 'home') $scope.act = 1;
            else if(eID == 'projects') $scope.act = 2;
            else if(eID == 'contact') $scope.act = 3;

            var i;
            var startY = currentYPosition();
            var stopY = elmYPosition(eID);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                window.scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 100);
            if (speed >= 20) speed = 20;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for (i = startY; i < stopY; i += step) {
                    setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
                    leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                } return;
            }
            for (i = startY; i > stopY; i -= step) {
                setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }
        }
        
        /* currentYPosition -
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (window.pageYOffset) {
                return window.pageYOffset;
            }
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop) {
                return document.documentElement.scrollTop;
            }
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) {
                return document.body.scrollTop;
            }
            return 0;
        }

        /* scrollTo -
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }
        /* Nav Bar Functions-
        ------------------------------------------------------------*/
        /*cross to hamburger menu and vice versa*/
        $scope.toggle_icon = function () {
            var element = document.getElementById("nav_icon");
            var options = document.getElementById("nav_options");
            element.classList.toggle("change");
            $scope.disappear=!$scope.disappear;
            $scope.less_opacity=!$scope.less_opacity;
            $scope.$apply();
        }
        /*Copy phone number function
        --------------------------------------------------*/
        $scope.copy_number = function(){
            const el = document.createElement('textarea');
            el.value = "8655261115";
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            alert("Phone Number copied to clipboard!")
        }
        $scope.copy_mail = function(){
            const elem = document.createElement('textarea');
            elem.value = "soham.khadatare@gmail.com";
            document.body.appendChild(elem);
            elem.select();
            document.execCommand('copy');
            document.body.removeChild(elem);
            alert("Email ID copied to clipboard!")
        }
        $scope.switch_page = function(path){
            $window.scrollTo(0, 0);
            $location.path(path);
            $location.hash('');
        }
        $scope.switch_page_hash = function(path,hash){
            $window.scrollTo(0, 0);
            $location.path(path);
            $location.hash(hash);
        }
    }]);


