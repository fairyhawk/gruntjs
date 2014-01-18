中文参考地址：http://gruntjs.cn/getting-started/
     
1.安装node.js会同时安装npm 下载地址：http://nodejs.org/download/


windows下用安装版本，会自带安装npm，验证安装成功：如果有问题就把安装目录下到环境变量path中。

 2.安装 grunt-cli
首先，你需要在全局环境中安装 Grunt 的命令行接口 (CLI, command line interface)。安装时可能需要使用 sudo (OS X、*nix、BSD 等平台) 或者超级管理员身份 (Windows 平台) 来运行以下命令。
npm install -g grunt-cli
以上命令会把 grunt 命令加入到你的系统路径中，从而允许你在任意目录中运行它。
注意，安装 grunt-cli 并不等于安装了 Grunt 任务运行器！Grunt CLI 的工作是：运行 Gruntfile 所在目录已经安装好的 Grunt 版本。 这样就可以在同一台机器上同时安装多个版本的 Grunt。
 3.配置项目grunt
  配置可以通过命令来生成默认的文件package.json和gruntfile.js
此步骤可以直接手动复制http://gruntjs.cn/getting-started/

	* package.json //项目自动化所依赖的相关插件。
	* Gruntfile.js //项目自动化工作流配置文件，重要


 我项目中的结构：

package.json:

{
  "name": " sns-static",
  "version": "1.0.0",
  "description": "sns.static",
  "devDependencies": {
    "grunt": "~0.4.2",
    "grunt- contrib- jshint": "~0.6.3",
    "grunt- contrib- nodeunit": "~0.2.2",
    "grunt- contrib- uglify": "~0.2.2",
    "grunt- contrib- htmlmin": "~0.1.3", 
    "grunt- contrib- cssmin": "~0.6.1",
    "grunt- contrib- imagemin": "~0.1.4",
    "grunt- regarde": "latest",
    "grunt- contrib-connect": "latest",
    "grunt- contrib- livereload": "latest"
  }
}



gruntfile.js:
module.exports = function(grunt) {

  // Project configuration.
     grunt.initConfig({
            //demo:http://gruntjs.cn/configuring-tasks/
             //jsmin
             uglify: {
               static_mappings: {
                 // Because these src -dest file mappings are manually specified, every
                 // time a new file is added or removed, the Gruntfile has to be updated.
                 files: [
                   {src: 'src/static/admin/js/admin-268xue.js', dest: 'build/static/admin/js/admin-268xue.js' },
                   {src: 'src/static/js/commonJs.js', dest: 'build/static/js/commonJs.js'},
                 ],
               },
               dynamic_mappings: {
                 // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
                 // runs and build the appropriate src-dest file mappings then, so you
                 // don't need to update the Gruntfile when files are added or removed.
                 files: [
                   {
                     expand: true,     // Enable dynamic expansion.
                     cwd: 'src/static/',      // Src matches are relative to this path.
                     src: [ 'js/blog/*.js',
                           'js/discuss/*.js',
                           'js/friend/*.js',
                           'js/header/*.js',
                           'js/letter/*.js',
                           'js/suggest/*.js',
                           'js/weibo/*.js',
                           'js/weibo/*.js',
                           ], // Actual pattern(s) to match.
                     dest: 'build/static/',   // Destination path prefix.
                     ext: '.js',   // Dest filepaths will have this extension. .min.js
                   },
                 ],
               }
             },
             //cssmin
             cssmin: {
                    dynamic_mappings: {
                      files: [
                        {
                          expand: true,  // Enable dynamic expansion.
                          cwd: 'src/static/',      // Src matches are relative to this path.
                          src: [ 'css/*.css'
                                ], // Actual pattern(s) to match.
                          dest: 'build/static/',   // Destination path prefix.
                          ext: '.css',   // Dest filepaths will have this extension. .min.js
                        },
                      ],
                    }
            },
           
            
            //htmlmin
            
           });

  // Load the plugin HTML/CSS/JS/IMG min
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt- contrib-htmlmin ');
  //grunt.loadNpmTasks('grunt- contrib-imagemin ');
     
  // build task(s).
  grunt.registerTask('build', ['uglify','cssmin']);
 
 
};


 
更详尽的配置任务说明可以参考：http://gruntjs.cn/configuring-tasks/

对应的操作步骤如下：
1.先配置好package.json、gruntfile.js两个文件

2. 执行命令自动下载相对应的Grunt插件
命令行执行:   npm install
执行后项目中会多出node_modules文件夹。

3.  编码完成后Buil (build对应的是gruntfile.js中设置的任务名字)
命令行执行:grunt build 

至此项目需要压缩的js和css完成。




