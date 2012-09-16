<?php
/**
 * PHPUnit
 *
 * Copyright (c) 2001-2012, Sebastian Bergmann <sebastian@phpunit.de>.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *
 *   * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in
 *     the documentation and/or other materials provided with the
 *     distribution.
 *
 *   * Neither the name of Sebastian Bergmann nor the names of his
 *     contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * @package    PHPUnit
 * @subpackage Util_Log
 * @author     Sebastian Bergmann <sebastian@phpunit.de>
 * @copyright  2001-2012 Sebastian Bergmann <sebastian@phpunit.de>
 * @license    http://www.opensource.org/licenses/bsd-license.php  BSD License
 * @link       http://www.phpunit.de/
 * @since      File available since Release 2.3.0
 */

/**
 * A TestListener that generates a logfile of the test execution in XML markup.
 *
 * The XML markup used is the same as the one that is used by the JUnit Ant task.
 *
 * @package    PHPUnit
 * @subpackage Util_Log
 * @author     Sebastian Bergmann <sebastian@phpunit.de>
 * @copyright  2001-2012 Sebastian Bergmann <sebastian@phpunit.de>
 * @license    http://www.opensource.org/licenses/bsd-license.php  BSD License
 * @version    Release: 3.6.11
 * @link       http://www.phpunit.de/
 * @since      Class available since Release 2.1.0
 */
class PHPUnit_Util_Log_QUnit extends PHPUnit_Util_Log_JUnit implements PHPUnit_Framework_TestListener
{
    public function getHTML($template = null)
    {
        $xml = parent::getXML();

        function splitTest($type, $content)
        {
            $parts = explode('-------------------------', $content);

            $output = '';

            array_shift($parts);
            array_pop($parts);

            foreach ($parts as $p) {
                $part = trim($p);
                $match = array();
                preg_match("/^(.*?)\n(.*?)\n(.*?)\n(.*)$/", $part, $match);

                $xml = '';
                $xml .= sprintf('<expected>%s</expected>', html_entity_decode($match[1], ENT_QUOTES));
                $xml .= sprintf('<result>%s</result>', html_entity_decode($match[2], ENT_QUOTES));
                $xml .= sprintf('<diff>%s</diff>', html_entity_decode(html_entity_decode(html_entity_decode($match[3], ENT_QUOTES))));
                $xml .= sprintf('<source>%s</source>', html_entity_decode($match[4], ENT_QUOTES));

                $output .= sprintf("<failure type=\"%s\">%s</failure>\n", $type, $xml);
            }

            return $output;
        }

        $xml = preg_replace('|<failure\s*(?:type="(\w+)")[^>]*>(.*?)</failure>|se', 'splitTest("\1","\2")', $xml);
        $xml = preg_replace('#\s*<(/?)(testsuites|testsuite|testcase|failure)#', '<$1$2', $xml);
        $xml = preg_replace('|^<\?xml[^>]+>|', '', $xml);
        $dom = new DOMDocument('1.0', 'UTF-8');
        $dom->loadXML($xml);
//        $dom->formatOutput = true;
//        $dom->preserveWhitespace = false;

        if($template == null) {
            header('Content-type: application/xml');
            return $dom->saveXML();
        }


        $xslt = new XSLTProcessor();
        $xslt->importStylesheet(DOMDocument::load($template));
        $html = $xslt->transformToXML($dom);

        return $html;
    }
}
