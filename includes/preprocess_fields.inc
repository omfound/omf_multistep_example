<?php

/**
 * hook_preprocess_textfield
 */
function caee_resource_form_preprocess_textfield(&$vars) {
  if (!empty($vars['element']['#omf_multistep']) && $vars['element']['#omf_multistep'] == 'caee_resource_form') {
    $vars['element']['#attributes']['class'][] = 'form-control';
  }
}

/**
 * hook_preprocess_textfield
 */
function caee_resource_form_preprocess_textarea(&$vars) {
  if (!empty($vars['element']['#omf_multistep']) && $vars['element']['#omf_multistep'] == 'caee_resource_form') {
    $vars['element']['#attributes']['class'][] = 'form-control';
  }
}

/**
 * hook_preprocess_checkboxes
 */
function caee_resource_form_preprocess_checkboxes(&$vars) {
  if (!empty($vars['element']['#omf_multistep']) && $vars['element']['#omf_multistep'] == 'caee_resource_form') {
    //$vars['element']['#attributes']['class'][] = 'checkbox-inline';
  }
}

function caee_resource_form_preprocess_button(&$vars) {
  if (!empty($vars['element']['#omf_multistep']) && $vars['element']['#omf_multistep'] == 'caee_resource_form') {
    $vars['element']['#attributes']['class'][] = 'btn';
    if ($vars['element']['#name'] != 'cancel') {
      $vars['element']['#attributes']['class'][] = 'btn-success';
    }
    else {
      $vars['element']['#attributes']['class'][] = 'btn-warning';
    }
  }
}
