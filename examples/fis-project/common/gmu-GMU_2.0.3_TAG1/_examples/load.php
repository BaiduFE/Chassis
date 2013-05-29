<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE);

// ------- functions -----------
function _buildFile(&$files, $arr){
    global $baseDir, $cssDir, $caches, $theme;
    foreach($arr as $index => $file) {
        $file = trim($file);
        if(!$file)continue;

        if(file_exists($baseDir.$file)) {
            $files[$file] = array(
                'js' => $file
            );
            $content=isset($caches[$file])?$caches[$file]:($caches[$file] = file_get_contents($baseDir.$file));
            //@import core/zepto.js, core/zepto.event.js, core/zepto.ui.js
            if(preg_match('/@import\s(.+?)$/ims', $content, $match)){
                $import = $match[1];
                $import = preg_replace("/\\s+/", "", $import);
                $imports = array_unique(explode(",", $import));
                $files[$file]['children'] = array();
                _buildFile($files[$file]['children'], $imports);
            }
            $files[$file]['css'] = array();
            if(preg_match('/@importcss\s(.+?)$/ims', $content, $match)){
                $import = $match[1];
                $import = preg_replace("/\\s+/", "", $import);
                $imports = array_unique(explode(",", $import));
                foreach($imports as $import){
                    if(is_file($cssDir.$import)){
                        $files[$file]['css'][] = $import;
                    }
                    if($theme){
                        $import = preg_replace('/css$/', $theme.'.css', $import);
                        if(is_file($cssDir.$import)){
                            $files[$file]['css'][] = $import;
                        }
                    }
                }
            }
            if(preg_match('/^(widget|chart)\/(.+?)(?:\.(.+?))?\.js/i', $file, $match)){// 如果是组件代码
                $cssFile = $match[1].'/'.$match[2].'/'.$match[2].(isset($match[3]) ?'.'.$match[3]:'').'.css';
                if(is_file($cssDir.$cssFile)){
                    $files[$file]['css'][] = $cssFile;
                }
                //find theme
                if($theme){
                    $cssFile = preg_replace('/\.css$/', '.'.$theme.'.css', $cssFile);
                    if(is_file($cssDir.$cssFile)){
                        $files[$file]['css'][] = $cssFile;
                    }
                }
            }
        }
    }
}

function _gennerateFile($files, &$arr, &$arr2){
    global $caches;
    foreach($files as $file){
        if(isset($file['children']) && is_array($file['children'])){
            _gennerateFile($file['children'], $arr, $arr2);
        }
        $js = $file['js'];
        if(!isset($arr[$js])){
            $arr[$js] = $caches[$js];
        }
        if(isset($file['css'])){
            $arr2 = array_unique(array_merge($arr2, $file['css']));
        }
    }
    return $arr;
}

function fixImagePath($cssFile){
    static $basepath;

    $content = file_get_contents($cssFile);

    if(!$basepath) {
        $dirname = basename(dirname(__FILE__));
        if(!isset($_SERVER['HTTP_REFERER']) || !preg_match('#^.*'.$dirname.'(/.*)$#', $_SERVER['HTTP_REFERER'] , $match) )return $content;
        $basepath = dirname(dirname(__FILE__).$match[1]);
    }
    preg_match_all('/url\((([\'"]?)(?!data)([^\'"]+?)\2)\)/im', $content, $m);
    if(isset($m[3])) {
        foreach($m[3] as $image) {
            if(!preg_match('/\.(gif|png|jpg|jpeg)$/i', $image))continue;
            $imagePath = realpath(dirname($cssFile).'/'.$image);
            if(!$imagePath) continue;
            $relativePath = getRelativePath($imagePath, $basepath);
            $content = str_replace($image, $relativePath, $content);
        }
    }
    return $content;
}

function getRelativePath($path, $relativePath){
    $relativePath = rtrim($relativePath, '/');
    $newPath = '';
    $path = explode("/", str_replace('\\', '/', $path));
    $relativePath = explode("/", str_replace('\\', '/', $relativePath));
    foreach( $path as $k => $v) {
        if($v != $relativePath[$k] )break;
    }
    array_splice($path, 0, $k);
    array_splice($relativePath, 0, $k);
    $newPath = str_pad($newPath, count($relativePath)*3, '../');
    $newPath .= implode("/", $path);
    return $newPath;
}


//--------logic -------

$type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';
$js = isset($_REQUEST['js']) ? $_REQUEST['js'] : '';
$theme = isset($_REQUEST['theme']) ? $_REQUEST['theme'] : '';
$baseUrl = isset($_REQUEST['base']) ? $_REQUEST['base'] : '../../_src/';
$mode = isset($_REQUEST['mode']) ? $_REQUEST['mode'] : '';
$baseDir = dirname(dirname(__FILE__)).'/_src/';
$cssDir = dirname(dirname(__FILE__)).'/assets/';

$allowedTypes = array('widget', 'core');
if (!in_array($type, $allowedTypes)) {
    $type = current($allowedTypes);
}

$js = preg_replace("/ +/", "", $js);
$jses = array_unique(explode(",", $js));
$caches = array(
    'core/zepto.js' => file_get_contents($baseDir.'core/zepto.js')
);

$files = array(
    'core/zepto.js' => array(
        'js' => 'core/zepto.js'
    )
);

_buildFile($files, $jses);
$alljs = array();
$allCss = array('reset.css');
_gennerateFile($files, $alljs, $allCss);

if($mode){
    header("Content-type: text/xml");
    $xml = '<?xml version="1.0" encoding="UTF-8" ?>'."\n";
    $xml .= '<root>';
    $xml .= '<jses>';
    foreach($alljs as $key => $val) {
        $xml .= '<js name="'.$key.'"><![CDATA['.$val.']]></js>';
    }
    $xml .='</jses>';
    $xml .= '<csses>';
    foreach($allCss as $val) {
        is_file($cssDir.$val) && ($xml .= '<css name="'.$val.'"><![CDATA['.fixImagePath($cssDir.$val).']]></css>');
    }
    $xml .='</csses>';
    $xml .= '</root>';
    echo $xml;
    return;
}

header('Content-Type: application/javascript');
?>
<?php foreach($alljs as $key => $val):?>
document.write('<script type="text/javascript" name="<?php echo $key?>" src="<?php echo $baseUrl.$key?>"></script>');
<?php endforeach; ?>