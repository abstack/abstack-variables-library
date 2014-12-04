var gulp = require('gulp'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    conf = {
        rootDir: './app',
        serverPort: 5005,
        livePort: 35727,
        lessPath: './app/styles/**/*.less',
        jsPath: './app/scripts/**/*.js',
        htmlPath: './app/**/*.html',
    };

gulp.task('default', ['runserver', 'watch']);

gulp.task('runserver', function(){
    connect.server({
        root: conf.rootDir,
        port: conf.serverPort,
        livereload: {
            port: conf.livePort
        }
    });
});

gulp.task('watch', function(){
    gulp.watch(conf.lessPath, lessTask);
    gulp.watch(conf.htmlPath, notifyReload);
    gulp.watch(conf.jsPath, notifyReload);
});

gulp.task('less', function(){lessTask()});

function lessTask(event){
    if(event)
        gutil.log('Compiling ' + gutil.colors.cyan('less') + '...');
    gulp.src(conf.lessPath)
        .pipe(less())
        .pipe(gulp.dest(conf.rootDir + '/styles/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(conf.rootDir + '/styles/'));

    if(event){
        gutil.log(gutil.colors.cyan('Less') + ' has been compiled.');
        notifyReload(event);
    }
}

function getFileName(file){
    return file.substring(file.lastIndexOf('/') + 1);
}

function notifyReload(event){
    if(!event.path || !event)
        return;
    gulp.src(event.path)
        .pipe(connect.reload(
            gutil.log(
                gutil.colors.magenta(getFileName(getFileName(event.path)))
                + ' was reloaded.'
            )
        ));
}
