<?php

/**
 * 2 column bootstrap checkboxes
 *
 * field array requirements:
 *   'type' => 'checkboxes',
 *   'theme' => 'bootstrap_checkboxes',
 * optional array attributes if you want control over the form element wrapper:
 *   'theme_wrappers' => array('omf_form_element'),
 *   'pre_render' => array('omf_pre_render_conditional_form_element'),
 *
 * required hook_theme_entries: 
 *   'bootstrap_checkboxes' => array(
 *     'render element' => 'element',
 *     'file' => '/includes/bootstrap_checkboxes.inc',
 *   ),
 *   'bootstrap_checkbox' => array(
 *     'render element' => 'element',
 *     'file' => '/includes/bootstrap_checkboxes.inc',
 *   ),
 *   'bootstrap_checkbox_element' => array(
 *     'render element' => 'element',
 *     'file' => '/includes/bootstrap_checkboxes.inc',
 *   ),
 */
function theme_bootstrap_checkboxes($variables) {
  $element = $variables['element'];
  $attributes = array();
  if (isset($element['#id'])) {
    $attributes['id'] = $element['#id'];
  }
  $attributes['class'][] = 'form-checkboxes checkbox-grid';
  if (!empty($element['#attributes']['class'])) {
    $attributes['class'] = array_merge($attributes['class'], $element['#attributes']['class']);
  }
  if (isset($element['#attributes']['title'])) {
    $attributes['title'] = $element['#attributes']['title'];
  }

  //for some reason #children is empty in element so we rebuild
  if (empty($element['#children'])) {
    $columns = 2;
    $column = 0;
    foreach ($element as $key => $value) {
      if (strpos($key, '#') === false && $element[$key]['#theme'] == 'checkbox') {
        $column++;
        if ($column > $columns) {
          $column = 1;
        }

        //here we override individual checkbox theme functions before rendering
        $element[$key]['#theme'] = 'bootstrap_checkbox';
        $element[$key]['#theme_wrappers'] = array('bootstrap_checkbox_element');

        if ($column == 1) {
          $element['#children'] .= '<div class="row">';
        }
        $element['#children'] .= drupal_render($element[$key]);
        if ($column == $columns) {
          $element['#children'] .= '</div>';
        }
      }
    }
  }
  return '<div' . drupal_attributes($attributes) . '>' . (!empty($element['#children']) ? $element['#children'] : '') . '</div>';
}

function theme_bootstrap_checkbox($variables) {
  $element = $variables['element'];
  $element['#attributes']['type'] = 'checkbox';
  element_set_attributes($element, array('id', 'name','#return_value' => 'value'));

  // Unchecked checkbox has #value of integer 0.
  if (!empty($element['#checked'])) {
    $element['#attributes']['checked'] = 'checked';
  }
  _form_set_class($element, array('form-checkbox'));

  return '<input' . drupal_attributes($element['#attributes']) . ' />';
}

function theme_bootstrap_checkbox_element($variables) {
  $element = &$variables['element'];
  $attributes = array();
  $t = get_t();
  $title = filter_xss_admin($element['#title']);
  $attributes['class'] = 'option';
  $output .= '<div class="col-xs-6">';
  $output .= '<label' . drupal_attributes($attributes) . '>';
  $output .= $element['#children'];
  $output .= ' ' . $t('!title !required', array('!title' => $title, '!required' => $required));
  $output .= "</label>\n";
  $output .= '</div>';

  return $output;
}


