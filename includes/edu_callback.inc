<?php

function caee_resource_form_edu_callback($standard_id = '', $children = '') {
  require_once('ceen_field_options.inc');
  $data = caee_resources_standards_complete();
  $subset = array();

  if (!empty($children) && !empty($standard_id)) {
    foreach ($data as $key => $info) {
      if ($info['parent_id'] == $standard_id) {
        $subset[$key] = $data[$key];
      }
    }
  }
  elseif (!empty($standard_id)) {
    $subset = $data[$standard_id];
  }
  else {
    foreach ($data as $key => $info) { 
      if (empty($info['parent_id'])) {
        $subset[$key] = $data[$key];
      }
    }
  }

  print drupal_json_encode($subset);
  return;
}
