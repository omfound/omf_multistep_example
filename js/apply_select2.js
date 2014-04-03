(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.omfFormBuilderSelect2 = {
    attach : function(context) {
      //excluding continuum because it uses the selectToUISlider library
      $(".form-select").not('#edit-resource-continuum').not('#edit-resource-edu-standard').select2({
        placeholder: "Select",
        allowClear: true
        //width: 'resolve'
      });
    }
  };
})(jQuery, Drupal, this, this.document);
