<?php

$start_url = ""; //Url de départ à crawler

$already_crawled = []; //Urls déjà crawlés
$crawling =[]; //Urls à crawler

/**
 * permet de récupérer les détails d'une URL
 *
 * @param [string] $url
 * @return void
 */
function get_details($url){
    $options = array('http' => array('method' => 'GET', 'headers' => "User-Agent: howBot/0.1")); //on définit les options d'entête
    $context = stream_context_create($options);//on crée le context

    $document = new DOMDocument();//on implémente un nouvel objet DOMDocument
    @$document->loadHTML(@file_get_contents($url, false, $context));//o charge le DOM de l'URL

    $title= $document->getElementsByTagName("title");//on récupère tous les éléments ayant le tag title
    $title = $title->item(0)->nodeValue;//title->item(0) équivaut à $title[0], nodeValue permet de récupérer la valeur entre les balise ouvrantes et fermantes title (voir doc)

$description =""; //pour l'instant notre description et nos keywords sont vides
$keywords ="";

$metas = $document->getElementsByTagName("meta");// on récupère tous les éléments ayant le tag meta
for($i = 0; $i < $metas->length; $i++){// on itère sur le tableau de meta reçu
    $meta = $metas->item($i); // on se positionne sur l'item ayant l'index actif de notre boule
    if($meta->getAttribute("name") == strtolower("description")){//on vérifie s'il possède l'attribut "name"
        $description = $meta->getAttribute("content");// si oui on récupère la valeur contenue dans content
    }
    if($meta->getAttribute("name") == strtolower("keywords")){//on fait de même pour les keywords
        $keywords = $meta->getAttribute("content");
    }
}

// on retourne une string avec toutes les informationsen format json
return '{"Title": "'.str_replace("\n", "", $title).'", "Description": "'.str_replace("\n", "", $description).'", "Keywords": "'.str_replace("\n", "", $keywords).'", "URL": "'.$url.'"},';
}

/**
 * permet de suivre les liens
 *
 * @param [string] $start_url
 * @return void
 */
function follow_links($start_url)
{
    // on récupère les 2 variables globales
    global $crawling;
    global $already_crawled;

    $options = array('http' => array('method' => 'GET', 'headers' => "User-Agent: howBot/0.1")); //on définit les options d'entête
    $context = stream_context_create($options);//on crée le context

    $document = new DOMDocument();//on implémente un nouvel objet DOMDocument
    @$document->loadHTML(@file_get_contents($start_url, false, $context));//on charge le DOM de l'URL

    $link_list = $document->getElementsByTagName("a");// on récupère tous les éléments balise <a> 

    foreach ($link_list as $link) {// pour chaque lien récupéré
        $l =  $link->getAttribute("href"); //on récupère le contenur du href

        //pour chaque type d'URL différente, on réécrit correctement l'url courante pour pouvoir l'utiliser

        if (substr($l, 0, 1) ==  '/' && substr($l, 0, 2) != '//') {
            $l = parse_url($start_url)['scheme'] . "://" . parse_url($start_url)['host'] . $l;
        } elseif (substr($l, 0, 2) == '//') {
            $l = parse_url($start_url)['scheme'] . ":" . $l;
        } elseif (substr($l, 0, 2) == './') {
            $l = parse_url($start_url)['scheme'] . "://" . parse_url($start_url)['host'] . dirname(parse_url($start_url)['path']) . substr($l, 1);
        } elseif (substr($l, 0, 1) == '#') {
            $l = parse_url($start_url)['scheme'] . "://" . parse_url($start_url)['host'] . parse_url($start_url)['path'] . $l;
        } elseif (substr($l, 0, 3) == '../') {
            $l = parse_url($start_url)['scheme'] . "://" . parse_url($start_url)['host'] . parse_url($start_url)['path'] . "/" . $l;
        } elseif (substr($l, 0, 11) == 'javascript:') {
            continue;
        } elseif (substr($l, 0, 5) != 'https' && substr($l, 0, 4) != 'http') {
            $l = parse_url($start_url)['scheme'] . "://" . parse_url($start_url)['host'] . '/' . $l;
        }

        //si l'url courante n'est pas dans la liste des url crawlées
        if (!in_array($l, $already_crawled)) {
            //on l'ajotue au tableau des url crawlées
            $already_crawled[] = $l;
            //on l'ajoute au tableau des url à crawler
            $crawling[] = $l;
            // on récupère les détails de l'url
            echo get_details($l);
        }


        array_shift($crawling);// on retire le premier élément du tableau des url à crawler, qui correspond à la dernière url traitée
        foreach($crawling as $site){//pour chacune des url à crawler on renvoit vers la première fonction pour crawler le site
            follow_links(($site));
        }
    }
};

follow_links($start_url);
