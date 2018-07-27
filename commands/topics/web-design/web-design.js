let Utils = require('../utils'),
    Tasks = require('./tasks/web-design-tasks'),
    inquirer = require('inquirer'),
    Promise = require('bluebird'),
    promiseWhile = require('promise-while')(Promise),
    emoji = require('node-emoji'),
    chalk = require('chalk');

/**
 * Tasks to create a web project.
 */
module.exports = {

    /**
     * The main set of steps for this topic.
     */
    steps: [{
        name: 'createIndex',
        message: 'Create a web project directory with index.html file inside',
        tasks: [
            Tasks.createProjectDirectory,
            Tasks.createIndexFile
        ]
    }, {
        name: 'connectStylesheet',
        message: 'Create and connect a CSS stylesheet',
        tasks: [
            Tasks.createCssDirectory,
            Tasks.createCssFile,
            Tasks.createHTMLLinkElement
        ]
    }, {
        name: 'addImages',
        message: 'Add images to the project',
        tasks: [
            Tasks.createImagesDirectory,
            Tasks.createImages
        ]
    }, {
        name: 'createContent',
        message: 'Create the content',
        tasks: [
            Tasks.createContentHTMLFile,
            Tasks.createContentCssFile
        ]
    }, {
        name: 'centerContent',
        message: 'Center the content',
        tasks: [
            Tasks.createCenteringHTMLFile,
            Tasks.createCenteringCssFile
        ]
    }, {
        name: 'specifyfontFamily',
        message: 'Specify font family',
        tasks: [
            Tasks.createFontFamilyHTMLFile,
            Tasks.createFontFamilyCssFile
        ]
    }, {
        name: 'addSpacing',
        message: 'Add spacing',
        tasks: [
            Tasks.createSpacingHTMLFile,
            Tasks.createSpacingCssFile
        ]
    }, {
        name: 'addColorAndContrast',
        message: 'Add color and contrast',
        tasks: [
            Tasks.createColorAndContrastHTMLFile,
            Tasks.createColorAndContrastCssFile
        ]
    }, {
        name: 'correctBalance',
        message: 'Correct the balance',
        tasks: [
            Tasks.createBalanceHTMLFile,
            Tasks.createBalanceCssFile
        ]
    }, {
        name: 'createPrimaryColor',
        message: 'Create primary color',
        tasks: [
            Tasks.createPrimaryColorHTMLFile,
            Tasks.createPrimaryColorCssFile
        ]
    }, {
        name: 'createSecondaryColor',
        message: 'Create secondary colors',
        tasks: [
            Tasks.createSecondaryColorHTMLFile,
            Tasks.createSecondaryColorCssFile
        ]
    }, {
        name: 'useCustomFont',
        message: 'Use a custom font',
        tasks: [
            Tasks.createCustomFontHTMLFile,
            Tasks.createCustomFontCssFile
        ]
    }, {
        name: 'addImages',
        message: 'Add images',
        tasks: [
            Tasks.createImagesHTMLFile,
            Tasks.createImagesCssFile
        ]
    }],

    /**
     * Run prompts for steps.
     */
    init: function () {
        let self = this;
        let i = 0;
        promiseWhile(function () { return i < self.steps.length },
            function () {
                return new Promise(function (resolve, reject) {
                    let step = self.steps[i];
                    inquirer
                        .prompt({
                            type: 'confirm',
                            name: step.name,
                            message: step.message
                        }).then((confirm) => {
                            if (confirm[step.name]) {
                                Utils.executeTasks(step.tasks).then(() => { resolve(i++); });
                            }
                        });
                });
            })
            .then(function () {
                console.log(chalk.green('***********************'));
                console.log(chalk.green(emoji.get('heavy_check_mark') + ' Done!'));
                console.log(chalk.green('***********************'));
            });
    }
}
