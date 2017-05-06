/* globals Promise */

import {get as getRequest } from './requester.js';
import Handlebars from 'handlebars';


export default class HandlebarsTemplate {
    constructor() {
        this._cacheObj = {};
    }

    loadTemplate(templateName) {
        if (this._cacheObj.hasOwnProperty(templateName)) {
            return Promise.resolve(this._cacheObj[templateName]);
        }

        return getRequest(`../templates/${templateName}.handlebars`)
            .then(template => {
                const compiledTemplate = Handlebars.compile(template);
                this._cacheObj[templateName] = compiledTemplate;
                return Promise.resolve(compiledTemplate);
            });
    }
}