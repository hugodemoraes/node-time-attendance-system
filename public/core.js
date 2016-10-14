var timerAttendance = angular.module('timerAttendance', []);

function mainController($scope, $http) {
    // when landing on the page, get all todos and show them
    $http.get('/api/times')
        .success(function(data) {
            $scope.times = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTime = function() {
        var obj = {
            time: new Date()
        };
        console.log(obj);
        $http.post('/api/times', obj)
            .success(function(data) {
                $scope.times = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTime = function(id) {
        $http.delete('/api/times/' + id)
            .success(function(data) {
                $scope.times = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
