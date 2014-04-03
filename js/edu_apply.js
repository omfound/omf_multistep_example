(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.eduApply = {
    attach : function(context) {
      if ($(".form-item-resource-edu-standard").length) {
        $(".form-item-resource-edu-standard").eduSelect({
          data_callback : Drupal.settings.basePath + "ajax_callback/education_standards"
        });
      }
    }
  };
})(jQuery, Drupal, this, this.document);
