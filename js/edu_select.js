(function( $ ){
  /**
   * UI Class. Handles updating the UI; no data manipulation here.
   */

  $.fn.eduSelectUI = function( method ) {
    var methods = {
      init : function(options) {
        $(this).addClass('js').append('<div class="eduselect_widget"><div class="control"><div class="tabs"></div><div class="container"><h3 class="title"></h3><div class="dropdown"></div></div><div class="bucket"></div></div></div>').find('input').hide();
        $(this).eduSelectUI('refresh');        
        return $(this);
      },
      /**
       * Refresh loads the data object created by eduSelect and adjusts the UI based on that data.
       */
      refresh : function() {
        var data = $(this).data('eduSelect');
        _refreshTabs(data);
        _refreshDropdown(data);
        _refreshBucket(data);
        
        return $(this);
      }
    }
    
    var settings = {
    }
    
    if (method && typeof method === 'object') {
      $.extend(settings, method);
    }
    
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof settings === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error( 'Method ' +  method + ' does not exist on internal class eduSelectUI' );
    }
    
    /**
     * Internal functions
     */
     
    function _refreshTabs(data) {
      if (typeof data.cache.root == 'undefined') {
        data.target.eduSelect('loadStandardSet', '', true);
      }
      else {
        var tabContent = $('<ul>');
        for (i in data.cache.root) {
          var $item = $('<li>').html('<span>' + data.cache.root[i].short_name + '</span>').data('eduSelect_meta', {
            id : i,
            name : data.cache.root[i].name
          });
          
          if (data.widget.openTab == i) {
            $item.addClass('active');
          }
          
          tabContent.append($item);
        }
        data.target.find('.tabs').empty().append(tabContent);
        $('.tabs li').click(function() {
          var meta = $(this).data('eduSelect_meta');
          data.target.find('h3.title').text(meta.name);
          data.widget.openTab = meta.id;
          data.widget.openDropdown = [];
          data.target.eduSelect('loadStandardSet', meta.id, true);
        });
      }
    }
    
    function _refreshDropdown(data) {
      var $dropdownContent = '';
      var refresh = true; // set up a refresh variable to prevent recursion issues.

      if (data.widget.openTab != '') {
        if (typeof data.cache[data.widget.openTab + '/children'] == 'undefined') {
          data.target.eduSelect('loadStandardSet', data.widget.openTab + '/children', true);
          refresh = false;
        }
        else {
          $dropdownContent = $('<ul>');
          for (var i in data.cache[data.widget.openTab + '/children']) {
            var $item = $('<li>' + data.cache[data.widget.openTab + '/children'][i].name + ' <a class="add" href="#" title="Add this education standard to the list.">Add</a> <a class="expand" href="#" title="Explore more standards in this section.">Expand</a></li>')
              .addClass("id_" + data.cache[data.widget.openTab + '/children'][i].standard_id)
              .data('eduSelect_meta', {
                id : data.cache[data.widget.openTab + '/children'][i].standard_id, 
                level: 0, 
                children : data.cache[data.widget.openTab + '/children'][i].children
              })
              .click(function() {
                $meta = $(this).data('eduSelect_meta');
                if ($meta.children == 1) {
                  _dropdownClickExpand(data, this);
                } else {
                }
                return false;
              });
              
              if (data.cache[data.widget.openTab + '/children'][i].children == 1) {
                $item.addClass('children');
              }
              
              $item.children('a.add').click(function () {
                var $meta = $(this).parent().data('eduSelect_meta');
                data.target.eduSelect('addStandard', $meta.id);                  
                return false;
              });
              
            $dropdownContent.append($item);
          }
          
          for (var j in data.widget.openDropdown) {
            if (typeof data.cache[data.widget.openDropdown[j] + '/children'] == 'undefined') {
              data.target.eduSelect('loadStandardSet', data.widget.openDropdown[j] + '/children', true);
              refresh = false;
            }
            else {
              $subtarget = $dropdownContent.find('.id_' + data.widget.openDropdown[j]);
              $meta = $subtarget.data('eduSelect_meta');
              
              $set = $('<ul>');
              for (var k in data.cache[data.widget.openDropdown[j] + '/children']) {
                $item = $('<li>' + data.cache[data.widget.openDropdown[j] + '/children'][k].name + ' <a class="add" href="#" title="Add this education standard to the list.">Add</a> <a class="expand" href="#" title="Explore more standards in this section.">Expand</a></li>')
                .addClass("id_" + data.cache[data.widget.openDropdown[j] + '/children'][k].standard_id)
                .data('eduSelect_meta', {
                  id : data.cache[data.widget.openDropdown[j] + '/children'][k].standard_id, 
                  level: parseInt(j) + 1, 
                  children : data.cache[data.widget.openDropdown[j] + '/children'][k].children
                })
                .click(function() {
                  $meta = $(this).data('eduSelect_meta');
                  if ($meta.children == 1) {
                    _dropdownClickExpand(data, this);
                  }
                  else {
                  }
                });
                                        
                if (data.cache[data.widget.openDropdown[j] + '/children'][k].children == 1) {
                  $item.addClass('children');
                }
                                
                $item.children('a.add').click(function () {
                  var $meta = $(this).parent().data('eduSelect_meta');
                  data.target.eduSelect('addStandard', $meta.id);             
                  return false;
                });
                
                $set.append($item);
              }
              $subtarget.after($set);
            }
          }
        }
      }
            
      if (refresh == true) {
        data.target.find('.dropdown').empty().append($dropdownContent);
      }
    }
    
    function _dropdownClickExpand(data, target) {
      var $meta = $(target).data('eduSelect_meta');
      var dropdownCount = data.widget.openDropdown.length;
      data.widget.openDropdown.splice($meta.level, dropdownCount - $meta.level);
      data.widget.openDropdown[$meta.level] = $meta.id;
      data.target.eduSelectUI('refresh');
    }
    
    /**
     * UI refresh for our bucket.
     */
    function _refreshBucket(data) {
      $content = $('<ul>');
      for (var i in data.values) {
        var parentId = data.cache[data.values[i]].parent_id;
        if (data.cache[parentId] == null) {
        }
        var topParentName = data.cache[data.cache[data.values[i]].parent_id].name;
        $item = $('<li>' + topParentName + ': ' + "<b>" + data.cache[data.values[i]].name + "</b>" + ' <a href="#">Remove</a></li>')
          .data('eduSelect_meta', {
            id : data.values[i]
          });
        $item.children('a').click(function() {
          var $meta = $(this).parent().data('eduSelect_meta');
          data.target.eduSelect('removeStandard', $meta.id);
          return false;
        });
        $content.append($item);
      }
      data.target.find('.bucket').empty().append($content);
    }
  }

  /**
   * jQuery plugin. Handles data gathering, calling UI code.
   */

  $.fn.eduSelect = function( method ) {
    var methods = {
      /**
       * Initalization function. Loads UI and starts the process of getting data from server.
       */
      init : function(options) {
        return this.each(function() {
          $(this).eduSelectUI();
          var data = $(this).data('eduSelect');
          $(this).eduSelect('loadStandardSet');
          data.values = $(this).find('input').val().split(',');
          
          if (data.values == '') {
            data.values = new Array();
            $(this).eduSelectUI('refresh', true);
          }
          
          for (i in data.values) {
            var refresh = false;
            if (i == data.values.length - 1) {
              refresh = true;
            }
            
            $(this).eduSelect('loadStandardSet', data.values[i], refresh);
          }
        });
      },
      
      /**
       * Adds a standard to our selected list.
       */
      addStandard : function(standardID) {      
        if ($.inArray(standardID, data.values) == -1) {
          data.values.push(standardID);
          data.target.find('input').val(data.values.toString());
        }
        if (typeof data.cache[standardID] == 'undefined') {
          $(this).eduSelect('loadStandardSet', standardID, true);
        }
        else {
          $(this).eduSelectUI('refresh');
        }
      },
      
      removeStandard : function(standardID) {
        var position = $.inArray(standardID, data.values);
        if (position != -1) {
          data.values.splice(position, 1);
          data.target.find('input').val(data.values.toString());
          data.target.eduSelectUI('refresh');
        }
      },
      
      loadStandardSet : function(id, refresh) {
        id = id || 'root';
        refresh = refresh || false;
        
        var url = data.data_callback;
        if (id != 'root') {
          url += '/' + id;
        }
        
        var $this = $(this);
        
        if (typeof data.cache[id] == 'undefined') {
          $.getJSON(url, function(result) {
            var data = $this.data('eduSelect');
            data.cache[id] = result;

            var parentid = data.cache[id].parent_id;
            var parenturl = data.data_callback;
            parenturl += '/' + parentid;
            $.getJSON(parenturl, function(result) {
              data.cache[parentid] = result;
              console.log(data.cache);
              if (refresh === true) {
                data.target.eduSelectUI('refresh');
              }
            });
           
            if (refresh === true) {
              data.target.eduSelectUI('refresh');
            }
          });
        }
        else {
          if (refresh === true) {
            data.target.eduSelectUI('refresh');
          }
        }
      }
    }
  
    var settings = {
      data_callback: '/ajax_callback/education_standards'
    }
    
    if (method && typeof method === 'object') {
      $.extend(settings, method);
    }
      
    var data = $(this).data('eduSelect');
    if (!data) {
      $(this).data('eduSelect', {
        target: $(this),
        data_callback: settings.data_callback,
        values: new Array(),
        widget: {
          openTab: '', // Set to id of current open tab.
          openDropdown: [] // Set as an array of open tab items.
        },
        cache: {}
      });
      data = $(this).data('eduSelect');
    }
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof settings === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  settings + ' does not exist on jQuery.eduSelect' );
    }
  };
})( jQuery );
