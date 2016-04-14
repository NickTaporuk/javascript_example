var app = angular.module("App",['ngDialog','ngLodash']);

app.factory('tablesData',['$http',function($http){
    var link = "/wp-admin/admin-ajax.php",
        actionsNameDb          = "getNameDatabase",
        actionsNamesTables     = "getNameTables",
        actionsMetaDataTable   = "getMetaDataTable",
        actionsDataTable       = "getDataTable",
        addNewItemTable        = "addNewItemTable",//
        getCountRowsDb         = "getCountRowsDb",//
        deleteRowDb            = "deleteRowDb",//
        actionsWp = {};
    return {
        /**/
        getNameDB:function(callback){
            actionsWp = {method:'GET', url:link,params:{"action":actionsNameDb}};
            return $http(actionsWp).success(callback);
        },
        /**/
        getNamesTables:function(callback){
            actionsWp = {method:'GET', url:link,params:{"action":actionsNamesTables}};
            return $http(actionsWp).success(callback);
        },
        /**/
        getMetaDataTable:function(name,callback){
            actionsWp = {method:'GET', url:link,params:{"action":actionsMetaDataTable,"table":name}};
            return $http(actionsWp).success(callback);
        },
        /**/
        getDataTable:function(name,limit,callback){
            actionsWp = {method:'GET', url:link,params:{"action":actionsDataTable,"table":name,"limit":limit}};
            return $http(actionsWp).success(callback);
        },
        /**/
        addNewItemTable:function(data,tableName,callback){
            console.log('data:',data);
            actionsWp = {method:'POST', url:link,params:{"action":addNewItemTable,"table":tableName,"data":data},headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
            return $http(actionsWp).success(callback);
        },
        /**
         * get count rows in table
         * */
        getCountRowsDb:function(tableName,callback){
            actionsWp = {method:'GET', url:link,params:{"action":getCountRowsDb,'table':tableName}};
            return $http(actionsWp).success(callback);
        },
        /**
         * delete row in table
         * */
        deleteRowDb:function(tableName,id,auto_increment,callback){
            actionsWp = {method:'GET', url:link,params:{"action":deleteRowDb,'table':tableName,'id':id,'auto_increment':auto_increment}};
            return $http(actionsWp).success(callback);
        }
    }
}]);

app.controller('adminCtrl',['$scope','$http','tablesData','ngDialog','lodash','$timeout',function($scope,$http,tablesData,ngDialog,lodash,$timeout){
    $scope.nameTables       = '';
    $scope.nameDb           = '';
    $scope.headerData       = '';
    $scope.headerDataDelFirsEl  = '';//delete 1 field in meta data fields
    $scope.selectedTable    = '';
    $scope.dataTable        = '';
    $scope.tableLimit       = 1000;
    $scope.tableCount       = '';
    $scope.paginationId     = 1;//count page pagination
    $scope.formData         = {};
    $scope.countRowsDb      = 0;
    $scope.crudText         = 'crud';
    $scope.autoIncrementName= '';
    $scope.removeId         = 0;
    $scope.updateId         = 0;


    //POPUP START
    $scope.clickToOpen = function () {
        $scope.headerDataDelFirsEl = lodash.rest($scope.headerData);
        //console.log($scope.headerDataDelFirsEl);
        ngDialog.open({
            template: 'templateId',
            scope:$scope
        });
    };
    //get form data from popup
    $scope.submit = function() {
        var formElements=document.getElementById("add-items-data");
        for (var i=0; i<formElements.length; i++){
            if (formElements[i].type!="submit") $scope.formData[formElements[i].name]=formElements[i].value;
        }
        //console.log('angular.toJson($scope.formData):', angular.toJson($scope.formData));
        if(formElements.length > 0){
            tablesData.addNewItemTable(JSON.stringify($scope.formData) , $scope.selectedTable, function(response ){
                console.log('response:',response);
            });
        }
        //add validate form v1.2
        ngDialog.close();
        console.debug($scope.formData);
    };
    //POPUP END
    //delete record in selected tables
    $scope.removeRecordFromDb = function(id){
        $scope.removeId = id;
        ngDialog.open({
            template: 'removeId',
            scope:$scope
        });
        console.log('removeDataFromDb:',$scope.autoIncrementName,id)
    };
    //
    $scope.updateRecordFromDb = function(id){
        ngDialog.open({
            template: 'updateId',
            scope:$scope
        });
        console.log('removeDataFromDb:',$scope.autoIncrementName,id)
    };
    //
    $scope.removeSubmit = function(){
        console.log('removeDataFromDb:',$scope.autoIncrementName, $scope.removeId);
        if($scope.autoIncrementName) {
            tablesData.deleteRowDb($scope.selectedTable, $scope.removeId, $scope.autoIncrementName, function(response) {
                console.log('$scope.dataTable delete:', $scope.dataTable);

                $timeout(function(){
                    tablesData.getDataTable($scope.selectedTable,$scope.tableLimit,function(response){

                        $scope.dataTable = response.response;
                    });
                });
            });
        } else {}


        $scope.removeId = 0;
        ngDialog.close();
    };
    //
    tablesData.getNameDB(function(response) {
        $scope.nameDb = response.response;
    });

    tablesData.getNamesTables(function(response) {
        $scope.nameTables = response.response;
    });

    $scope.renderTable = function(){
        tablesData.getNamesTables(function(response) {
            $scope.nameTables = response.response;
        });
        //
        tablesData.getMetaDataTable($scope.selectedTable,function(response){
            //console.log('response.response meta:',response.response);
            //console.log('response.response data:',lodash.filter(response.response,'Extra'));
            var data = [];
            for(var i=0;i<response.response.length;i++){
                //console.log('response.response[i]->'+i,response.response[i]);
                if(response.response[i].Extra == 'auto_increment'){
                    $scope.autoIncrementName = response.response[i].Field;
                    //console.log('response.response[i].Field',response.response[i].Field);
                }
                data.push(response.response[i].Field);
            }
            $scope.headerData = data;
            $scope.headerData.push($scope.crudText);
        });
        //
        tablesData.getDataTable($scope.selectedTable,$scope.tableLimit,function(response){

            $scope.dataTable = response.response;
        });

        tablesData.getCountRowsDb($scope.selectedTable,function(response){
            console.log('response.response:',response.response[0].count);
            $scope.countRowsDb = response.response[0].count;
        });
    };
}]);

}]);