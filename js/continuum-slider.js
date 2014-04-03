(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.continuumSlider = {
    attach : function(context) {
      if ($(".form-item-resource-continuum").length) {
        $(".form-item-resource-continuum select").hide();
        $("#edit-resource-continuum").selectToUISlider({labels: 6, labelSrc:"text"});
      }
    }
  };
})(jQuery, Drupal, this, this.document);
