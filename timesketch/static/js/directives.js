/*
Copyright 2014 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

var directives = angular.module('timesketch.directives', []);

directives.directive("butterbar", function() {
    return {
        restrict : "A",
        link : function(scope, element, attrs) {
            scope.$on("httpreq-start", function(e) {
                element.css({"display": "block"});
            });

            scope.$on("httpreq-complete", function(e) {
                element.css({"display": "none"});
            });
        }
    };
});

directives.directive('timelineColor', function () {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
          var tlcolors = scope.meta.timeline_colors
          elem.css("background", "#" + tlcolors[scope.$parent.event.es_index])
      }
    }
});

directives.directive('timelineName', function () {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
          var tlnames = scope.meta.timeline_names
          elem.addClass("label")
          elem.css("color", "#999")
          elem.append(tlnames[scope.$parent.event.es_index])
      }
    }
});

directives.directive('indexChooser', function() {
    return {
      restrict: 'A',
      scope: {
        filter: '=',
        search: '=',
        meta: '='
      },
      link: function (scope, elem, attrs) {
        scope.$watch("filter", function(value) {
            var i = scope.filter.indexes.indexOf(attrs.index);
            if (i == -1) {
                elem.css('color', '#d1d1d1');
                elem.find(".color-box").css('background', '#e9e9e9');
                elem.find(".t").css('text-decoration', 'line-through');
                elem.find("input").prop("checked", false);
            } else {
                elem.css('color', '#333');
                elem.find(".t").css('text-decoration', 'none');
                elem.find("input").prop("checked", true);
            }
        })
        elem.bind('click', function() {
            var i = scope.filter.indexes.indexOf(attrs.index);
            if (i > -1) {
                scope.filter.indexes.splice(i, 1);
                elem.css('color', '#d1d1d1');
                elem.find(".color-box").css('background', '#e9e9e9');
                elem.find(".t").css('text-decoration', 'line-through');
                elem.find("input").prop("checked", false);
            } else {
                scope.filter.indexes.push(attrs.index)
                elem.css('color', '#333');
                elem.find(".t").css('text-decoration', 'normal');
                elem.find('.color-box').css('background', "#" + scope.meta.timeline_colors[attrs.index])
                elem.find("input").prop("checked", true);

            }
            scope.search()
        })
      }
    }
});

directives.directive('indexDisabler', function() {
    return {
      restrict: 'A',
      scope: {
        filter: '=',
        search: '=',
        meta: '='
      },
      link: function (scope, elem, attrs) {
        elem.bind('click', function() {
            var b = document.getElementsByClassName("timelinebox")
            for (var i=0; i < b.length; i++) {
                var e = $(b[i])
                e.css('color', '#d1d1d1');
                e.find(".color-box").css('background', '#e9e9e9');
                e.find(".t").css('text-decoration', 'line-through');
                e.find("input").prop("checked", false);
            }

            scope.filter.indexes = []
            scope.search()
        })
      }
    }
});

directives.directive('indexEnabler', function() {
    return {
      restrict: 'A',
      scope: {
        filter: '=',
        search: '=',
        meta: '='
      },
      link: function (scope, elem, attrs) {

        elem.bind('click', function() {
            var name_to_index = {}
            for (var index in scope.meta.timeline_names) {
                var _name = scope.meta.timeline_names[index]
                name_to_index[_name] = index
            }
            var b = document.getElementsByClassName("timelinebox")
            for (var i=0; i < b.length; i++) {
                var e = $(b[i]);
                var name = String(e[0].innerText).trim();
                e.css('color', '#333');
                e.find(".t").css('text-decoration', 'normal');
                e.find('.color-box').css('background', "#" + scope.meta.timeline_colors[name_to_index[name]])
                e.find("input").prop("checked", true);
            }
            scope.filter.indexes = []
            for (var n in scope.meta.timeline_names) {
                scope.filter.indexes.push(n)
            }
            scope.search()

        })
      }
    }
});
