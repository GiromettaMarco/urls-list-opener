<?php
$file_list = filter_input(INPUT_GET, 'fl');
$list = file($file_list, FILE_IGNORE_NEW_LINES);
header('Content-Type: application/json');
echo json_encode(
    array(
        'list' => $list,
    )
);
