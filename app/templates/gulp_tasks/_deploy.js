'use strict';

var host = 'host_ip',
    username = 'username',
    password = 'password';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    client = require('scp2'),
    ssh = require('gulp-ssh'),
    Q = require('q');

gulp.task('scp', function () {
    var deferred = Q.defer();
    client.scp('release/', username+':'+password+'@'+host+':'+'/path/to/your_app/', function(err) {
        if(err === null)
        {
            console.log('uploaded!!');
            deferred.resolve();
        }
        else
        {
            console.log(err);
        }
    });
    console.log('uploading...');
    return deferred.promise;
});

gulp.task('ssh_clear', function () {
    return ssh({
        ignoreErrors: false,
        sshConfig: {
            host: host,
            port: 22,
            username: username,
            password:password
        }
    }).exec(['rm -rf /path/to/your_app/*'], {filePath: 'commands.log'});
});

gulp.task('deploy', function(callback) {
    runSequence(
        'ssh_clear',
        'scp',
        callback);
});
