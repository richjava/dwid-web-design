'use strict';
let Utils = require('../../utils'),
    Config = require('./tasks-config'),
    Promise = require('bluebird'),
    promiseWhile = require('promise-while')(Promise);

/**
 * Class for tasks to create a web project.
 */
module.exports = {

    /**
    * Task to create project directory.
    */
    createProjectDirectory: function () {
        let args = {
            path: Config.projectName,
            successText: 'Created project directory in ' + process.cwd(),
            explanationText: 'Your web project "' + Config.projectName + '" is just a folder with HTML files and other ' +
            'resources inside.'
        }
        return Utils.createDirectory(args);
    },

    /**
     * Task to create index file.
     */
    createIndexFile: function () {
        let args = {
            fromFileName: 'boilerplate.html',
            toFileName: 'index.html',
            fromPath: Config.assetsDir + '/html/setup/',
            toPath: Config.projectName + '/',
            successText: 'Created index.html file in the project directory',
            explanationText: 'Your home HTML page is named "index" because web servers ' +
            'will look for an HTML file by this name as a starting point. Right now there\'s just some "boilerplate" ' +
            'code (code to start off with) in it. Double-click on the file to open it in a browser.'
        }
        return Utils.createFile(args);
    },

    /**
     * Task to create CSS directory.
     */
    createCssDirectory: function () {
        let args = {
            path: Config.projectName + '/css',
            successText: 'Created "css" directory in ' + process.cwd()
        }
        return Utils.createDirectory(args);
    },

    /**
     * Task to create main CSS file.
     */
    createCssFile: function () {
        let args = {
            fromFileName: 'comments.css',
            toFileName: 'style.css',
            fromPath: Config.assetsDir + '/css/setup/',
            toPath: Config.projectName + '/css',
            successText: 'Created "style.css" file in the "css" directory',
            explanationText: 'Your project should only have one CSS file for your styles. This is because it takes time ' +
            'to retrieve each file from the server and more files will increase the page loading time. Common naming ' +
            'conventions for this file are "style.css", "styles.css" or "main.css".'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create HTML link element in index file.
    */
    createHTMLLinkElement: function (resolve) {
        let args = {
            fromFileName: 'stylesheet-link.html',
            toFileName: 'index.html',
            fromPath: Config.assetsDir + '/html/setup/',
            toPath: Config.projectName + '/',
            successText: 'Created HTML link element in index.html',
            explanationText: 'A link to your stylesheet was added to the "head" section of your index.html. Now any ' +
            'styles that your write in main.css will be applied. Now we have our project set up, so let\'s get started with ' +
            'the web design!'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
     * Task to create images directory.
     */
    createImagesDirectory: function () {
        let args = {
            path: Config.projectName + '/images',
            successText: 'Created "images" directory in ' + process.cwd()
        }
        return Utils.createDirectory(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create images in the images directory.
    */
    createImages: function () {
        let self = this;
        let images = [
            { fromFileName: 'header.jpg' },
            { fromFileName: 'images.png' },
            { fromFileName: 'web-design-in-4-minutes.png' }
        ];
        let i = 0;
        return new Promise(function (resolve, reject) {
            promiseWhile(function () { return i < images.length },
                function () {
                    return new Promise(function (resolve, reject) {
                        let image = images[i];
                        image.fromPath = Config.assetsDir + '/images/';
                        image.toPath = Config.projectName + '/images';
                        image.successText = 'Added ' + image.fromFileName;
                        Utils.createFile(image)
                            .then(resolved => { return resolve(i++); })

                    });
                }).then(() => {resolve();} );
        });
    },

    /**
    * Task to create Content section in the index file.
    */
    createContentHTMLFile: function () {
        let args = {
            fromFileName: 'content.html',
            toFileName: 'index.html',
            fromPath: Config.assetsDir + '/html/design/',
            toPath: Config.projectName + '/',
            successText: 'Created content in index.html'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Content CSS file.
    */
    createContentCssFile: function () {
        let args = {
            fromFileName: 'content.css',
            toFileName: 'style.css',
            fromPath: Config.assetsDir + '/css/design/',
            toPath: Config.projectName + '/css',
            successText: 'Created base styles in "style.css"',
            explanationText: 'Base styles define default styling for how elements should look in all ' +
            'occurrences on the page. They don\'t include any class or ID selectors.'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Centering section in the index file.
    */
    createCenteringHTMLFile: function () {
        let args = {
            fromFileName: 'centering.html',
            toFileName: 'index.html',
            fromPath: Config.assetsDir + '/html/design/',
            toPath: Config.projectName + '/',
            successText: 'Creted Centering section in index.html'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Centering CSS file.
    */
    createCenteringCssFile: function () {
        let args = {
            fromFileName: 'centering.css',
            toFileName: 'style.css',
            fromPath: Config.assetsDir + '/css/design/',
            toPath: Config.projectName + '/css',
            successText: 'Created centering styles for container in "style.css"',
            explanationText: 'In this case, the "main" and "header" HTML elements are used as containers, but it\'s common to ' +
            ' apply these styles to a CSS class called "container" and apply that class to div or section elements.'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Font Family section in the index file.
    */
    createFontFamilyHTMLFile: function () {
        let args = {
            fromFileName: 'font-family.html',
            toFileName: 'index.html',
            fromPath: Config.assetsDir + '/html/design/',
            toPath: Config.projectName + '/',
            successText: 'Created Font Family section in index.html'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Font Family CSS file.
    */
    createFontFamilyCssFile: function () {
        let args = {
            fromFileName: 'font-family.css',
            toFileName: 'style.css',
            fromPath: Config.assetsDir + '/css/design/',
            toPath: Config.projectName + '/css',
            successText: 'Created font-family styles in "style.css"'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Spacing section in the index file.
    */
    createSpacingHTMLFile: function () {
        let args = {
            fromFileName: 'spacing.html',
            toFileName: 'index.html',
            fromPath: Config.assetsDir + '/html/design/',
            toPath: Config.projectName + '/',
            successText: 'Created Font Family section in index.html'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Spacing CSS file.
    */
    createSpacingCssFile: function () {
        let args = {
            fromFileName: 'spacing.css',
            toFileName: 'style.css',
            fromPath: Config.assetsDir + '/css/design/',
            toPath: Config.projectName + '/css',
            successText: 'Created spacing styles in "style.css"'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Color and Contast section in the index file.
    */
    createColorAndContrastHTMLFile: function () {
        let args = {
            fromFileName: 'color-and-contrast.html',
            toFileName: 'index.html',
            fromPath: Config.assetsDir + '/html/design/',
            toPath: Config.projectName + '/',
            successText: 'Created Color and Contrast section in index.html'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Color and Contast CSS file.
    */
    createColorAndContrastCssFile: function () {
        let args = {
            fromFileName: 'color-and-contrast.css',
            toFileName: 'style.css',
            fromPath: Config.assetsDir + '/css/design/',
            toPath: Config.projectName + '/css',
            successText: 'Created styles for color and contrast in "style.css"'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Balance section in the index file.
    */
    createBalanceHTMLFile: function () {
        let args = {
            fromFileName: 'balance.html',
            toFileName: 'index.html',
            fromPath: Config.assetsDir + '/html/design/',
            toPath: Config.projectName + '/',
            successText: 'Created Balance section in index.html'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Balance CSS file.
    */
    createBalanceCssFile: function () {
        let args = {
            fromFileName: 'balance.css',
            toFileName: 'style.css',
            fromPath: Config.assetsDir + '/css/design/',
            toPath: Config.projectName + '/css',
            successText: 'Created styles for correcting the balance of the page in "style.css"'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Primary Color section in the index file.
    */
    createPrimaryColorHTMLFile: function () {
        let args = {
            fromFileName: 'primary-color.html',
            toFileName: 'index.html',
            fromPath: Config.assetsDir + '/html/design/',
            toPath: Config.projectName + '/',
            successText: 'Created Primary Color section in index.html'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Primary Color CSS file.
    */
    createPrimaryColorCssFile: function () {
        let args = {
            fromFileName: 'primary-color.css',
            toFileName: 'style.css',
            fromPath: Config.assetsDir + '/css/design/',
            toPath: Config.projectName + '/css',
            successText: 'Created primary color styles in "style.css"'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Secondary Color section in the index file.
    */
    createSecondaryColorHTMLFile: function () {
        let args = {
            fromFileName: 'secondary-colors.html',
            toFileName: 'index.html',
            fromPath: Config.assetsDir + '/html/design/',
            toPath: Config.projectName + '/',
            successText: 'Created Secondary Color section in index.html'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Secondary Color CSS file.
    */
    createSecondaryColorCssFile: function () {
        let args = {
            fromFileName: 'secondary-colors.css',
            toFileName: 'style.css',
            fromPath: Config.assetsDir + '/css/design/',
            toPath: Config.projectName + '/css',
            successText: 'Created secondary color styles in "style.css"'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Custom Font section in the index file.
    */
    createCustomFontHTMLFile: function () {
        let args = {
            fromFileName: 'custom-font.html',
            toFileName: 'index.html',
            fromPath: Config.assetsDir + '/html/design/',
            toPath: Config.projectName + '/',
            successText: 'Created Custom Font section in index.html'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Custom Font CSS file.
    */
    createCustomFontCssFile: function () {
        let args = {
            fromFileName: 'custom-font.css',
            toFileName: 'style.css',
            fromPath: Config.assetsDir + '/css/design/',
            toPath: Config.projectName + '/css',
            successText: 'Created custom font styles in "style.css"'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Images section in the index file
    */
    createImagesHTMLFile: function () {
        let args = {
            fromFileName: 'images.html',
            toFileName: 'index.html',
            fromPath: Config.assetsDir + '/html/design/',
            toPath: Config.projectName + '/',
            successText: 'Created Images section in index.html'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    },

    /**
    * Task to create Images CSS file.
    */
    createImagesCssFile: function () {
        let args = {
            fromFileName: 'images.css',
            toFileName: 'style.css',
            fromPath: Config.assetsDir + '/css/design/',
            toPath: Config.projectName + '/css',
            successText: 'Created image styles in "style.css"'
        }
        return Utils.createFile(args)
            .catch(error => console.log(error.message));
    }
}