'use strict';
//var util = require('util');
//var path = require('path');
var yeoman = require('yeoman-generator');
var utils = require('../app/util.js');
var chalk = require('chalk');


var YoAngularGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },
  promptTask: function () {
    var done = this.async();
    // have Yeoman greet the user
    this.log(this.yeoman);
    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('This generator will generate a web app project using NodeJS and angularJS.'));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your module name',
        default: this.appname // Default to current folder name
      },
      {
        type: 'confirm',
        name: 'node',
        message: 'Do you want using NodeJS ?',
        default:false
      }];

    this.prompt(prompts, function (answers) {
      this.scriptAppName = answers.name;
      this.node = answers.node;
      done();
    }.bind(this));
  },
  app: function(){
    if(this.node) {
      this.clientPath = '/client/';
      utils.copyClient(this);
      utils.copyServer(this);
    }
    else
    {
      this.clientPath = '/';
      utils.copyAngular(this);
    }
  },
  projectfiles: function () {
    this.copy('_.gitignore', '.gitignore');
    this.copy('_.jshintrc', '.jshintrc');
    this.copy('_bower.json', 'bower.json');
    this.copy('_.bowerrc', '.bowerrc');
    this.copy('_.editorconfig', '.editorconfig');
    this.copy('_gulpfile.js', 'gulpfile.js');
    this.copy('_package.json', 'package.json');
    this.copy('_karma.conf.js', 'karma.conf.js');
    this.copy('_protractor.conf.js', 'protractor.conf.js');
  }
});

module.exports = YoAngularGenerator;
