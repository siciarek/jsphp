/**
 * (PHP 4, PHP 5)<br/>
 * Make a string lowercase
 * @link http://php.net/manual/en/function.strtolower.php
 * @param string $str <p>
 * The input string.
 * </p>
 * @return string the lowercased string.
 */
function strtolower($str) {
    ___validate_function_arguments(
        'strtolower',
        {
            required: [true],
            type: ['any']
        },
        arguments
    );

    if($str === null || $str === false) {
        $str = "";
    }

    if($str === true) {
        $str = "1";
    }

    var vtype = ___gettype($str);

    if($str !== "" && (vtype === 'array' || vtype === 'object')) {
        var cn = ___get_constructor_name($str);
        var obj = cn === 'Array' || cn === 'Object' ? 'array' : 'object';
        throw new Exception("strtolower() expects parameter 1 to be string, " + obj + " given");
    }

    $str = "" + $str;

    return $str.toLowerCase();
}
