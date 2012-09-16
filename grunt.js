/*global module:false*/
module.exports = function (grunt) {
    // readOptionalJSON
    // by Ben Alman
    // https://gist.github.com/2876125
    function readOptionalJSON(filepath) {
        var data = {};
        try {
            data = grunt.file.readJSON(filepath);
            grunt.verbose.write("Reading " + filepath + "...").ok();
        } catch (e) {
        }
        return data;
    }

    function getModuleBanner(module, description) {
       return '/**\n' +
            ' * ' + description + '\n' +
            ' * @module ' + module + '\n' +
            ' * @author <%= pkg.author.name %>\n' +
            ' * @version <%= pkg.version %>\n' +
            ' */';
    }

    // Project configuration.
    grunt.initConfig({

        pkg: '<json:project.json>',
        meta: {
            standard_defines: getModuleBanner('standard_defines', 'Standard Defines'),
            Superglobals: getModuleBanner('Superglobals', 'Superglobals are built-in variables that are always available in all scopes'),
            Core_c: getModuleBanner('Core_c', 'Core c classes'),
            standard_0: getModuleBanner('standard_0', 'Standard Functions Basic'),
            standard_1: getModuleBanner('standard_1', 'Standard Functions Part 1'),
            standard_2: getModuleBanner('standard_2', 'Standard Functions Part 2'),
            standard_3: getModuleBanner('standard_3', 'Standard Functions Part 3'),
            standard_4: getModuleBanner('standard_4', 'Standard Functions Part 4'),
            standard_5: getModuleBanner('standard_5', 'Standard Functions Part 5'),
            standard_6: getModuleBanner('standard_6', 'Standard Functions Part 6'),
            standard_7: getModuleBanner('standard_7', 'Standard Functions Part 7'),
            standard_8: getModuleBanner('standard_8', 'Standard Functions Part 8'),
            standard_9: getModuleBanner('standard_9', 'Standard Functions Part 9'),
            pcre: getModuleBanner('pcre', 'Perl Compatible Regular Expressions'),
            date: getModuleBanner('date', 'Date Functions'),
            banner: '/*!\n' +
                '<%= " * " + pkg.description || "" %> v<%= pkg.version %>\n' +
                ' *\n' +
                ' * Based on: http://www.php.net/\n' +
                ' *\n' +
                '<%= pkg.homepage ? " * GitHub: " + pkg.homepage + "\n" : "" %>' +
                ' * Built at: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                ' * Dual licensed under the MIT or GPL Version 2 licenses.\n' +
                ' * <%= pkg.licenses[0].url %>' +
                ' * <%= pkg.licenses[1].url %>' +
                '\n */'
        },
        concat: {
            standard_defines: {
                src: [
                    '<banner:meta.standard_defines>',
                    'src/standard_defines.js'
                ],
                dest: 'dist/standard_defines.js'
            },
            Superglobals: {
                src: [
                    '<banner:meta.Superglobals>',
                    'src/Superglobals.js'
                ],
                dest: 'dist/Superglobals.js'
            },
            Core_c: {
                src: [
                    '<banner:meta.Core_c>',
                    'src/Core_c/Exception.js',
                    'src/Core_c/stdClass.js'
                ],
                dest: 'dist/Core_c.js'
            },
            pcre: {
                src: [
                    '<banner:meta.pcre>',
                    'src/pcre.js'
                ],
                dest: 'dist/pcre.js'
            },
            standard_0: {
                src: [
                    '<banner:meta.standard_0>',
                    'src/standard_0/__PHP_Incomplete_Class.js'
                ],
                dest: 'dist/standard_0.js'
            },
            standard_1: {
                src: [
                    '<banner:meta.standard_1>',
                    'src/standard_1/nl2br.js',
                    'src/standard_1/str_repeat.js',
                    'src/standard_1/strtolower.js',
                    'src/standard_1/strtoupper.js',
                    'src/standard_1/strrev.js'
                ],
                dest: 'dist/standard_1.js'
            },
            standard_3: {
                src: [
                    '<banner:meta.standard_3>',
                    'src/standard_3/base64_encode.js',
                    'src/standard_3/base64_decode.js',
                    'src/standard_3/pi.js'
                ],
                dest: 'dist/standard_3.js'
            },
            standard_4: {
                src: [

                    '<banner:meta.standard_4>',
                    'src/standard_4/print_r.js',
                    'src/standard_4/var_dump.js',
                    'src/standard_4/serialize.js',
                    'src/standard_4/unserialize.js'
                ],
                dest: 'dist/standard_4.js'
            },
            standard_5: {
                src: [
                    '<banner:meta.standard_5>',
                    'src/standard_5/gettype.js'
                ],
                dest: 'dist/standard_5.js'
            }
        },
        min: {
            dist: {
                src: [
                    '<banner:meta.banner>',
                    'src/bootstrap.js',
                    'dist/standard_defines.js',
                    'dist/Core_c.js',
                    'dist/pcre.js',
                    'dist/standard_0.js',
                    'dist/standard_1.js',
                    'dist/standard_3.js',
                    'dist/standard_4.js',
                    'dist/standard_5.js'
                ],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        jshint: (function () {
            function jshintrc(path) {
                return readOptionalJSON((path || "") + ".jshintrc") || {};
            }

            return {
                options: jshintrc(),
                globals: {
                    i: true
                }
            };
        })(),

        lint: {
            files: [
                'grunt.js',
                'dist/<%= pkg.name %>.js'
            ]
        },

        qunit: {
            files: [
                "testjs/index.html"
            ]
        },

        compare_size: {
            files: [
                'dist/<%= pkg.name %>.js',
                'dist/<%= pkg.name %>.min.js'
            ]
        },

        jasmine: {
            all: {
                src: ['specs/specrunner.html'],
                errorReporting: true
            }
        },

        uglify: {

        }
    });

    grunt.registerTask('regular', function (commit, configFile) {
        console.log('\n\n *** REGULAR RUN ***\n\n');
    });

    // Default task.
    grunt.registerTask('default', 'regular concat min');

    grunt.registerTask('sntx', 'concat lint');
    grunt.registerTask('test', 'concat qunit');

    // Load grunt tasks from NPM packages
    grunt.loadNpmTasks("grunt-compare-size");
    grunt.loadNpmTasks("grunt-jasmine-task");
};
