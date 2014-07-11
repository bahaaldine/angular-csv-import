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
	.src('https://raw.github.com/imagemin/gifsicle-bin/0.1.6/vendor/osx/gifsicle', 'darwin')
	.src('https://raw.github.com/imagemin/gifsicle-bin/0.1.6/vendor/linux/x86/gifsicle', 'linux', 'x86')
	.src('https://raw.github.com/imagemin/gifsicle-bin/0.1.6/vendor/linux/x64/gifsicle', 'linux', 'x64')
	.src('https://raw.github.com/imagemin/gifsicle-bin/0.1.6/vendor/freebsd/x86/gifsicle', 'freebsd', 'x86')
	.src('https://raw.github.com/imagemin/gifsicle-bin/0.1.6/vendor/freebsd/x64/gifsicle', 'freebsd', 'x64')
	.src('https://raw.github.com/imagemin/gifsicle-bin/0.1.6/vendor/win/x86/gifsicle.exe', 'win32', 'x86')
	.src('https://raw.github.com/imagemin/gifsicle-bin/0.1.6/vendor/win/x86/gifsicle.exe', 'win32', 'x64')
	.dest(path.join(__dirname, 'vendor'))
	.use(process.platform === 'win32' ? 'gifsicle.exe' : 'gifsicle');

/**
 * Only run check if binary doesn't already exist
 */

fs.exists(bin.use(), function (exists) {
	if (!exists) {
		bin.run(['--version'], function (err) {
			if (err) {
				console.log(chalk.red('✗ pre-build test failed, compiling from source...'));

				var builder = new BinBuild()
					.src('http://www.lcdf.org/gifsicle/gifsicle-1.83.tar.gz')
					.cfg('./configure --disable-gifview --disable-gifdiff --prefix="' + bin.dest() + '" --bindir="' + bin.dest() + '"')
					.make('make install');

				return builder.build(function (err) {
					if (err) {
						return console.log(chalk.red('✗ ' + err));
					}

					console.log(chalk.green('✓ gifsicle built successfully'));
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
