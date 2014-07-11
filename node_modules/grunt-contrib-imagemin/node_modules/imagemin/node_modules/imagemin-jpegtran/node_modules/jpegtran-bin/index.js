'use strict';

var BinBuild = require('bin-build');
var BinWrapper = require('bin-wrapper');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

/**
 * Initialize a new BinWrapper
 */

var bin = new BinWrapper()
	.src('https://raw.github.com/imagemin/jpegtran-bin/0.2.7/vendor/osx/jpegtran', 'darwin')
	.src('https://raw.github.com/imagemin/jpegtran-bin/0.2.7/vendor/linux/x86/jpegtran', 'linux', 'x86')
	.src('https://raw.github.com/imagemin/jpegtran-bin/0.2.7/vendor/linux/x64/jpegtran', 'linux', 'x64')
	.src('https://raw.github.com/imagemin/jpegtran-bin/0.2.7/vendor/freebsd/jpegtran', 'freebsd')
	.src('https://raw.github.com/imagemin/jpegtran-bin/0.2.7/vendor/sunos/x86/jpegtran', 'sunos', 'x86')
	.src('https://raw.github.com/imagemin/jpegtran-bin/0.2.7/vendor/sunos/x64/jpegtran', 'sunos', 'x64')
	.src('https://raw.github.com/imagemin/jpegtran-bin/0.2.7/vendor/win/x86/jpegtran.exe', 'win32', 'x86')
	.src('https://raw.github.com/imagemin/jpegtran-bin/0.2.7/vendor/win/x64/jpegtran.exe', 'win32', 'x64')
	.src('https://raw.github.com/imagemin/jpegtran-bin/0.2.7/vendor/win/x86/libjpeg-62.dll', 'win32', 'x86')
	.src('https://raw.github.com/imagemin/jpegtran-bin/0.2.7/vendor/win/x64/libjpeg-62.dll', 'win32', 'x64')
	.dest(path.join(__dirname, 'vendor'))
	.use(process.platform === 'win32' ? 'jpegtran.exe' : 'jpegtran');

/**
 * Only run check if binary doesn't already exist
 */

fs.exists(bin.use(), function (exists) {
	if (!exists) {
		var args = [
			'-copy', 'none',
			'-optimize',
			'-outfile', path.join(__dirname, 'test/fixtures/test-optimized.jpg'),
			path.join(__dirname, 'test/fixtures/test.jpg')
		];

		bin.run(args, function (err) {
			if (err) {
				console.log(chalk.red('✗ pre-build test failed, compiling from source...'));

				var builder = new BinBuild()
					.src('http://downloads.sourceforge.net/project/libjpeg-turbo/1.3.0/libjpeg-turbo-1.3.0.tar.gz')
					.cfg('./configure --disable-shared --prefix="' + bin.dest() + '" --bindir="' + bin.dest() + '"')
					.make('make install');

				return builder.build(function (err) {
					if (err) {
						return console.log(chalk.red('✗ ' + err));
					}

					console.log(chalk.green('✓ jpegtran built successfully'));
				});
			}

			console.log(chalk.green('✓ pre-build test passed successfully'));
		});
	}
});

/**
 * Module exports
 */

module.exports.path = bin.use();
