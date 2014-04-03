(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.checkboxParentClass = {
    attach : function(context) {
      $(".checkbox-grid input:checked").each(function() {
        $(this).closest("label").toggleClass("checked", this.checked); 
      });

      $(".checkbox-grid input[type='checkbox']").change(function() {
        $(this).closest("label").toggleClass("checked", this.checked); 
      });

    }
  };
})(jQuery, Drupal, this, this.document);
