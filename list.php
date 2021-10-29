<?php
$list = file('list.txt', FILE_IGNORE_NEW_LINES);
header('Content-Type: application/json');
echo json_encode(
    array(
        'list' => $list,
    )
);
