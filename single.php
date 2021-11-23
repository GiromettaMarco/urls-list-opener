<?php

// Data delimiters.
$title_start = '<title>';
$title_end = '</title>';
$data_start = '<span class="notranslate" id="prcIsum" itemprop="price"  style="text-decoration:none" content="';
$data_end = '">';

// Retriever function
function get_string_between($subject, $start, $end){
    $matches = array();
    preg_match('#' . preg_quote($start) . '(.+?)' . preg_quote($end) . '#s', $subject, $matches);
    return $matches[1];
}

// Request options
$print = filter_input(INPUT_GET, 'prt', FILTER_VALIDATE_BOOLEAN);
$url = filter_input(INPUT_GET, 'url');

// cURL
$curl_handle=curl_init();
curl_setopt($curl_handle, CURLOPT_URL, $url);
curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl_handle, CURLOPT_USERAGENT, 'URL List Opener/1.0');
$query = curl_exec($curl_handle);
curl_close($curl_handle);

// Response
if ($print) {
    print_r($query);
} else {
    header('Content-Type: application/json');
    if ($query) {
        $title = get_string_between($query, $title_start, $title_end);
        $data = get_string_between($query, $data_start, $data_end);
        echo json_encode(
            array(
                'status'    => true,
                'title'     => $title,
                'data'      => $data,
            )
        );
    } else {
        echo json_encode(
            array(
                'status'    => false,
            )
        );
    }
}