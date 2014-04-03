<?php

function caee_resource_form_learning_resources() {
  return array(
    'Curriculum' => 'Curriculum',
    'Curriculum Unit' => 'Curriculum Unit',
    'Lesson Plan' => 'Lesson Plan',
    'Activity' => 'Activity',
    'Worksheet' => 'Worksheet',
    'Book or Material' => 'Book or Material',
    'Kit, Trunk, Equipment or Supply' => 'Kit, Trunk, Equipment or Supply',
    'Speaker, Presenter, Performer' => 'Speaker, Presenter, Performer',
    'Video, Multimedia' => 'Video, Multimedia',
    'Game' => 'Game',
    'Science Project' => 'Science Project',
    'Grant or Funding Opportunity' => 'Grant or Funding Opportunity',
  );
}

function caee_resource_form_experiences() {
  return array(
    'Event' => 'Event',
    'Camp' => 'Camp',
    'Career' => 'Career',
    'Workshop, Course' => 'Workshop, Course',
    'Field Trip' => 'Field Trip',
    'Service Project' => 'Service Project',
    'Speaker, Presenter, Performer' => 'Speaker, Presenter, Performer',
    'Outdoor Classroom' => 'Outdoor Classroom',
    'Nature Center' => 'Nature Center',
    'Distance Learning' => 'Distance Learning',
  );
}

function caee_resource_form_participant_types() {
  return array(
    'General Public',
    'Families',
    'Home school',
    'Non-formal education',
    'Pre-service teachers',
    'Private school',
    'Public school',
    'Youth groups/scouts',
    'Special needs',
    'Educators',
  );
}

function caee_resource_form_resource_topics() {
  return array(
    'Outdoor Skills' => array(
      'Camping' => 'Camping',
      'Hiking' => 'Hiking',
      'Boating/canoeing' => 'Boating/canoeing',
      'Birding/wildlife watching' => 'Birding/wildlife watching',
      'Fishing skills/safety' => 'Fishing skills/safety',
      'Hunting skills/safety' => 'Hunting skills/safety',
      'Shooting skills/safety' => 'Shooting skills/safety',
      'Trapping skills/safety' => 'Trapping skills/safety',
      'Orienteering/geocaching' => 'Orienteering/geocaching',
    ),
    'Wildlife' => array(
      'Mammals' => 'Mammals',
      'Birds' => 'Birds',
      'Fish' => 'Fish',
      'Reptiles and amphibians' => 'Reptiles and amphibians',
      'Insects' => 'Insects',
      'Plants' => 'Plants',
      'Endangered species' => 'Endangered species',
      'Exotic invasive species' => 'Exotic invasive species',
    ),
    'Habitat and Systems' => array(
      'Ecosystems' => 'Ecosystems',
      'Wetland habitat/systems' => 'Wetland habitat/systems',
      'Lake habitat/systems' => 'Lake habitat/systems',
      'Riparian (river) habitat/systems' => 'Riparian (river) habitat/systems',
      'Marine habitat/systems' => 'Marine habitat/systems',
      'Estuary habitat/systems' => 'Estuary habitat/systems',
      'Forest habitat/systems' => 'Forest habitat/systems',
      'Grassland/prairie habitat/systems' => 'Grassland/prairie habitat/systems',
      'Habitat restoration' => 'Habitat restoration',
      'Fire and prescribed burning' => 'Fire and prescribed burning',
    ),
    'Environment' => array(
      'Climate change' => 'Climate change',
      'Air quality' => 'Air quality',
      'Water quality' => 'Water quality',
      'Pollution' => 'Pollution',
      'Human population' => 'Human population',
      'Recycling' => 'Recycling',
    ),
    'Conservation' => array(
      'Energy conservation' => 'Energy conservation',
      'Water conservation' => 'Water conservation',
      'Soil conservation' => 'Soil conservation',
      'Conservation principles/practices' => 'Conservation principles/practices',
      'North American conservation model' => 'North American conservation model',
      'Conservation history' => 'Conservation history',
    ),
    'Natural Resources' => array(
      'Renewable energy' => 'Renewable energy',
      'Forest management' => 'Forest management',
      'Fisheries management' => 'Fisheries management',
      'Wildlife management' => 'Wildlife management',
      'Minerals management' => 'Minerals management',
      'Watershed management' => 'Watershed management',
      'Agriculture' => 'Agriculture',
    ),
    'Subjects and topics' => array(
      'Careers' => 'Careers',
      'Migration' => 'Migration',
      'Adaptation' => 'Adaptation',
      'Population dynamics' => 'Population dynamics',
      'Predator-prey relationship' => 'Predator-prey relationship',
      'Nutrient cycle' => 'Nutrient cycle',
      'Water cycle' => 'Water cycle',
      'Ecology' => 'Ecology',
      'Geology' => 'Geology',
      'Geography' => 'Geography',
      'Meteorology' => 'Meteorology',
      'Physics' => 'Physics',
      'Stewardship' => 'Stewardship',
      'Green Schools' => 'Green Schools',
    ),
  );
}

function caee_resource_form_subjects() {
  return array(
    'Math' => 'Math', 
    'Science' => 'Science', 
    'English/Language Arts' => 'English/Language Arts', 
    'Health/Physical Education' => 'Health/Physical Education', 
    'Environment/Conservation' => 'Environment/Conservation',
    'Social Studies' => 'Social Studies', 
    'Art' => 'Art', 
    'Agriculture' => 'Agriculture'
  );
}

function caee_resource_form_audiences() {
  return array(
    'PreK' => 'PreK',
    'Elementary School' => 'Elementary School',
    'Middle School' => 'Middle School',
    'High School' => 'High School',
    'College/University' => 'College/University',
    'Adults' => 'Adults',
    'Seniors' => 'Seniors',
    'Families' => 'Families',
  );
}

function caee_resources_grades() {
  return array(
    -1 => "N/A",
     0 => "Preschool",
     1 => "Kindergarten",
     2 => "1st Grade",
     3 => "2nd Grade",
     4 => "3rd Grade",
     5 => "4th Grade",
     6 => "5th Grade",
     7 => "6th Grade",
     8 => "7th Grade",
     9 => "8th Grade",
     10 => "9th Grade",
     11 => "10th Grade",
     12 => "11th Grade",
     13 => "12th Grade",
     14 => "College - undergraduate",
     15 => "College - graduate",
     16 => "Adult Education",
  );
}

function caee_resources_continuum() {
  return array('N/A', 'Awareness', 'Information', 'Knowlege', 'Skills', 'Action');
}

function caee_resources_standards_complete() {
  require_once('ceen_education_standards.inc');
  return ceen_resource_form_complete_edu_standards();
}

function caee_resources_standards_options() {
  require_once('ceen_education_standards.inc');
  $complete_standards = ceen_resource_form_complete_edu_standards();
  $options_standards = array();
  foreach ($complete_standards as $id => $info) {
    $options_standards[$id] = $info['name'];
  }
  return $options_standards;
}
