/**
 * standard_0.php - Unit Test (QUnit)
 */

module("standard_0.php", {
    setup: function () {

    },
    teardown: function () {

    }
});

test("__PHP_Incomplete_Class()  ", 3, function () {
    var expected, result, obj;

    var defined = typeof __PHP_Incomplete_Class === 'function';
    ok(defined, 'class is defined');
    if(defined === false) {
        return;
    }
    obj = new __PHP_Incomplete_Class();
    equal(getConstructorNameForTest(obj), '__PHP_Incomplete_Class', 'constructor is implemented');

    try {
        equal('' + obj, expected, 'toString');
        ok(false, 'No exception was thrown.');
    }
    catch(e) {
        equal(
            e,
            'Object of class __PHP_Incomplete_Class could not be converted to string in Command line code on line 1',
            'conversion to string should throw an exception'
        );
    }
});

/*
test("php_user_filter()  ", function () {
    ok(false, "Not implemented yet.");
});
test("Directory()  ", function () {
    ok(false, "Not implemented yet.");
});
test("constant ($name) ", function () {
    ok(false, "Not implemented yet.");
});

test("bin2hex ($str) ", function () {
    ok(false, "Not implemented yet.");
});

test("sleep ($seconds) ", function () {
    ok(false, "Not implemented yet.");
});

test("usleep ($micro_seconds) ", function () {
    ok(false, "Not implemented yet.");
});

test("time_nanosleep ($seconds, $nanoseconds) ", function () {
    ok(false, "Not implemented yet.");
});

test("time_sleep_until ($timestamp) ", function () {
    ok(false, "Not implemented yet.");
});

test("strptime ($date, $format) ", function () {
    ok(false, "Not implemented yet.");
});

test("flush () ", function () {
    ok(false, "Not implemented yet.");
});

test("wordwrap ($str, $width, $break, $cut) ", function () {
    ok(false, "Not implemented yet.");
});

test("htmlspecialchars ($string, $quote_style, $charset, $double_encode) ", function () {
    ok(false, "Not implemented yet.");
});

test("htmlentities ($string, $quote_style, $charset, $double_encode) ", function () {
    var phrase;
    var result;
    var expected;

    phrase = '<div class="myclass" style=\'border:1px solid black\'>a&b</div>';

    expected = '&lt;div class=&quot;myclass&quot; style=&#039;border:1px solid black&#039;&gt;a&amp;b&lt;/div&gt;';
    result = htmlentities(phrase);
    strictEqual(result, expected, 'no quote style');

    expected = '&lt;div class=&quot;myclass&quot; style=\'border:1px solid black\'&gt;a&amp;b&lt;/div&gt;';
    result = htmlentities(phrase, ENT_COMPAT);
    strictEqual(result, expected, 'quote style: ENT_COMPAT');

    expected = '&lt;div class=&quot;myclass&quot; style=&#039;border:1px solid black&#039;&gt;a&amp;b&lt;/div&gt;';
    result = htmlentities(phrase, ENT_QUOTES);
    strictEqual(result, expected, 'quote style: ENT_QUOTES');

    expected = '&lt;div class="myclass" style=\'border:1px solid black\'&gt;a&amp;b&lt;/div&gt;';
    result = htmlentities(phrase, ENT_NOQUOTES);
    strictEqual(result, expected, 'quote style: ENT_NOQUOTES');


    phrase = '<p>ampersand=&amp;, lt=&lt;, gt=&gt; quot=&quot; others=&#039;&copy;</p>';

    expected = '&lt;p&gt;ampersand=&amp;amp;, lt=&amp;lt;, gt=&amp;gt; quot=&amp;quot; others=&amp;#039;&amp;copy;&lt;/p&gt;';
    result = htmlentities(phrase, null, null);
    strictEqual(result, expected, 'double_encode: not given');

    expected = '&lt;p&gt;ampersand=&amp;amp;, lt=&amp;lt;, gt=&amp;gt; quot=&amp;quot; others=&amp;#039;&amp;copy;&lt;/p&gt;';
    result = htmlentities(phrase, null, null, true);
    strictEqual(result, expected, 'double_encode: true');

    expected = '&lt;p&gt;ampersand=&amp;, lt=&lt;, gt=&gt; quot=&quot; others=&#039;&copy;&lt;/p&gt;';
    result = htmlentities(phrase, null, null, false);
    strictEqual(result, expected, 'double_encode: false');


});

test("html_entity_decode ($string, $quote_style, $charset) ", function () {
    ok(false, "Not implemented yet.");
});

test("htmlspecialchars_decode ($string, $quote_style) ", function () {
    ok(false, "Not implemented yet.");
});

test("get_html_translation_table ($table, $quote_style) ", function () {
    ok(false, "Not implemented yet.");
});

test("sha1 ($str, $raw_output) ", function () {
    ok(false, "Not implemented yet.");
});

test("sha1_file ($filename, $raw_output) ", function () {
    ok(false, "Not implemented yet.");
});

test("md5 ($str, $raw_output) ", function () {
    ok(false, "Not implemented yet.");
});

test("md5_file ($filename, $raw_output) ", function () {
    ok(false, "Not implemented yet.");
});

test("crc32 ($str) ", function () {
    ok(false, "Not implemented yet.");
});

test("iptcparse ($iptcblock) ", function () {
    ok(false, "Not implemented yet.");
});

test("iptcembed ($iptcdata, $jpeg_file_name, $spool) ", function () {
    ok(false, "Not implemented yet.");
});

test("getimagesize ($filename, $imageinfo) ", function () {
    ok(false, "Not implemented yet.");
});

test("image_type_to_mime_type ($imagetype) ", function () {
    ok(false, "Not implemented yet.");
});

test("image_type_to_extension ($imagetype, $include_dot) ", function () {
    ok(false, "Not implemented yet.");
});

test("phpinfo ($what) ", function () {
    ok(false, "Not implemented yet.");
});

test("phpversion ($extension) ", function () {
    ok(false, "Not implemented yet.");
});

test("phpcredits ($flag) ", function () {
    ok(false, "Not implemented yet.");
});

test("php_logo_guid () ", function () {
    ok(false, "Not implemented yet.");
});

test("php_real_logo_guid () ", function () {
    ok(false, "Not implemented yet.");
});

test("php_egg_logo_guid () ", function () {
    ok(false, "Not implemented yet.");
});

test("zend_logo_guid () ", function () {
    ok(false, "Not implemented yet.");
});

test("php_sapi_name () ", function () {
    ok(false, "Not implemented yet.");
});

test("php_uname ($mode) ", function () {
    ok(false, "Not implemented yet.");
});

test("php_ini_scanned_files () ", function () {
    ok(false, "Not implemented yet.");
});

test("php_ini_loaded_file () ", function () {
    ok(false, "Not implemented yet.");
});

test("strnatcmp ($str1, $str2) ", function () {
    ok(false, "Not implemented yet.");
});

test("strnatcasecmp ($str1, $str2) ", function () {
    ok(false, "Not implemented yet.");
});

test("substr_count ($haystack, $needle, $offset, $length) ", function () {
    ok(false, "Not implemented yet.");
});

test("strspn ($subject, $mask, $start, $length) ", function () {
    ok(false, "Not implemented yet.");
});

test("strcspn ($str1, $str2, $start, $length) ", function () {
    ok(false, "Not implemented yet.");
});

test("strtok ($str, $token) ", function () {
    ok(false, "Not implemented yet.");
});

*/