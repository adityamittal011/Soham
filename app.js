var app = angular.module('soham', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/36_days_of_type', {
            templateUrl: 'partials/36_days_of_type.html'
        })
        .when('/culturals_website', {
            templateUrl: 'partials/culturals_website.html'
        })
        .when('/token', {
            templateUrl: 'partials/token.html'
        })
        .when('/4th_poster_typo', {
            templateUrl: 'partials/4th_poster_typo.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$window', 
    function($scope,$window){
    
    /* active tab
    ----------------------------*/
        
        angular.element($window).bind('scroll', function () {
            var projects_y = elmYPosition('projects');
            var contact_y = elmYPosition('contact');
            var currentY = currentYPosition();
            //projects_y is also the height of the screen
            if(currentY<(projects_y/2)) $scope.act = 1;
            else if(currentY<(contact_y-(projects_y/2))) $scope.act = 2;
            else $scope.act = 3;
            $scope.$apply();
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
            el.value = "88";
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            alert("Phone Number copied to clipboard!")
        }
    }]);