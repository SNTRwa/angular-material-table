'use strict';

angular.module('ngMdTable', ['ngMaterial']).directive('ngMdTable', function($filter) {
    return {
      restrict: 'E',
      scope: {
        tableName: '@tableName',
        data: '=data',
        columns: '=',
        pageSize: '=pageSize',
        showSearch: '=showSearch',
        showPagination: '=showPagination',
        isLoaded: '='
      },
      templateUrl: 'ngMdTable/table.html',
      link: function(scope, element) {
        scope.currentPage = 0;

        scope.showSearch = scope.showSearch || false;
        scope.showPagination = scope.showPagination || false;
        if(scope.isLoaded === undefined){
          scope.isLoaded = true;
        }

        scope.$watch('searchInput', function() {
          if (scope.currentPage >= scope.numberOfPages()) {
            scope.currentPage = 0;
          };
        });

        scope.order = function(predicate, reverse) {
          var dataAfterFiltration = $filter('filter')(scope.data, scope.searchInput);
          scope.lastPredicate = predicate;
          scope.reverse = reverse;
          scope.data = $filter('orderBy')(dataAfterFiltration, predicate, reverse);
        };

        scope.numberOfPages = function() {
          var dataAfterFiltration = $filter('filter')(scope.data, scope.searchInput);
          return Math.ceil(dataAfterFiltration.length / scope.pageSize);
        }

        scope.showArrowUp = function(columnName, reverse) {
          return scope.lastPredicate === columnName && !reverse;
        }

        scope.showArrowDown = function(columnName, reverse) {
          return scope.lastPredicate === columnName && reverse;
        }

      }
    }
  })
  .filter('startFrom', function() {
    return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
    }
  })
  .filter('floor', function() {
    return function(input) {
      return Math.floor(input);
    }
  })
  .filter('search', function() {
    return function(array, searcherInput) {
      return Math.floor(input);
    }
  })
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('ngMdTable/table.html', '<div> <section class="loading-animation" ng-show="isLoaded"> <md-toolbar class="table-toolbar md-primary"> <div class="md-toolbar-tools"> <h3>{{tableName}}</h3> <span flex></span> <md-input-container class="toolbar-input" ng-show="showSearch"> <label>Search by...</label> <input ng-model="searchInput"> </md-input-container> </div> </md-toolbar> <table class="md-table" ng-show="filtered.length"> <!--Columns section--> <tr> <th ng-init="reverse = false;" ng-repeat="column in columns" style="width:{{100/columns.length | floor}}%"> <span class="pointer" ng-class="{sortationActive: lastPredicate === column.identificator}" ng-if="column.settings.sortable"> <a ng-click="reverse=!reverse;order(column.identificator, reverse)">{{column.name}}</a> <!--Sorting direction indicators--> <span> <span ng-if="showArrowUp(column.identificator, reverse)">&#x25B2;</span> <span ng-if="showArrowDown(column.identificator, reverse)">&#x25BC;</span> </span> <!--/Sorting direction indicators--> <!--Show that sorting is possible--> <span class="can-be-sorted" ng-if="(lastPredicate !== column.identificator)"> <span>&#x25B2;</span> <span>&#x25BC;</span> </span> <!--/Show that sorting is possible--> </span> <!--Non sortable column--> <span ng-if="!column.settings.sortable"> <a>{{column.name}}</a> </span> <!--/Non sortable column--> </th> </tr> <!--/Columns section--> <!--Data rows--> <tr ng-repeat="row in filtered = (data | startFrom:currentPage*pageSize | filter: searchInput | limitTo:pageSize )"> <td ng-repeat="(key, val) in row"> {{val}} </td> </tr> <!--/Data rows--> </table> <div class="no-results" ng-show="(filtered.length === 0 && searchInput)"> <h1>Sorry, we don\'t have any data matching your query.</h1> </div> <div class="no-results" ng-if="(filtered.length === 0 && !searchInput)"> <h1>No data to load!</h1> </div> <!--Table footer with pagination--> <footer class="table-footer" layout-wrap layout="row" ng-show="pageSize"> <div flex="33" layout-align="start center" layout="row"> <md-button ng-click="currentPage=currentPage-1" ng-disabled="currentPage === 0"> Previous </md-button> </div> <div flex="33" layout-align="center center" layout="row"> <h3>{{currentPage+1}}/{{numberOfPages()}}</h3> </div> <div flex="33" layout-align="end center" layout="row"> <md-button ng-click="currentPage=currentPage+1" ng-disabled="currentPage + 1 >= numberOfPages()"> Next </md-button> </div> </footer> <!--/Table footer with pagination--> </section> </div>');
  }]);
