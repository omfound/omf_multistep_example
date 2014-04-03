(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.caeeFormSlider = {
    attach : function(context) {
      $('.form-item-resource-grade-slider').show();
      $('.form-item-resource-grade-min').hide();
      $('.form-item-resource-grade-max').hide();
 
      var grade_levels = new Array();

      grade_levels[-1] = "N/A"
      grade_levels[0] = "Preschool";
      grade_levels[1] = "Kindergarten";
      grade_levels[2] = "1st Grade";
      grade_levels[3] = "2nd Grade";
      grade_levels[4] = "3rd Grade";
      grade_levels[5] = "4th Grade";
      grade_levels[6] = "5th Grade";
      grade_levels[7] = "6th Grade";
      grade_levels[8] = "7th Grade";
      grade_levels[9] = "8th Grade";
      grade_levels[10] = "9th Grade";
      grade_levels[11] = "10th Grade";
      grade_levels[12] = "11th Grade";
      grade_levels[13] = "12th Grade";
      grade_levels[14] = "College - undergraduate";
      grade_levels[15] = "College - graduate";
      grade_levels[16] = "Adult Education";

      var default_values = new Array();
      if (!parseInt($('#s2id_edit-resource-grade-min').select2("val"))) {
        default_values[0] = '-1';
      } else {
        default_values[0] = $('#s2id_edit-resource-grade-min').select2("val");
      }

      if (!parseInt($('#s2id_edit-resource-grade-max').select2("val"))) {
        default_values[1] = '-1';
      } else {
        default_values[1] = $('#s2id_edit-resource-grade-max').select2("val");
      }

      $(".grade-slider").slider({
        range: true,
        min: -1,
        max: 16,
        values: default_values,
        slide: function( event, ui ) {
          $("#s2id_edit-resource-grade-min").select2("val", ui.values[0]);
          $("#s2id_edit-resource-grade-max").select2("val", ui.values[1]);
          $(".form-item-resource-grade-slider .slider-value").html( grade_levels[ui.values[0]] + " - " + grade_levels[ui.values[1]]);
        },
      });
    }
  };
})(jQuery, Drupal, this, this.document);
