<?php

$extensions= ['csv'];

if(isset($_FILES['csv'])){
  /* Get the name of the uploaded file */
  $filename = $_FILES['csv']['name'];
  $info= new SplFileInfo($filename);
  $fileExtension = $info->getExtension();
  
  if(in_array($fileExtension, $extensions)){
      $dir = 'assets/uploads/';
     
      /* Save the uploaded file to the local filesystem */
      if (move_uploaded_file($_FILES['csv']['tmp_name'], __DIR__.'/../'.$dir.'csv.'.$fileExtension) ) { 
        echo read_csv();
      } else { 
        echo 'Failure'; 
      }
  } else {
    echo 'Failure';
  }
}

/**
 * lit le fichier csv des menus
 *
 * @return array
 */
function read_csv(){
  $dir = '/../assets/uploads/';
  $fp = fopen( __dir__.$dir.'csv.csv', 'r');
  while($data = fgetcsv($fp, null, ';')){
      $return[] = $data;
  }
  return json_encode($return);
}

?>