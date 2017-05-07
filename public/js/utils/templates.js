/* globals Promise */

import Requester from 'requester';
import Handlebars from 'handlebars';


export default class HandlebarsTemplate {
    constructor() {
        this._cacheObj = {};
        this._requester = new Requester();
    }

    loadTemplate(templateName) {
        if (this._cacheObj.hasOwnProperty(templateName)) {
            return Promise.resolve(this._cacheObj[templateName]);
        }

        return this._requester.get(`../templates/${templateName}.handlebars`)
            .then(template => {
                const compiledTemplate = Handlebars.compile(template);
                this._cacheObj[templateName] = compiledTemplate;
                return Promise.resolve(compiledTemplate);
            });
    }
}