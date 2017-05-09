/* globals toastr*/
import toastr from 'toastr';

export default class Validator {

    validateLen(x, len) {
        'use strict';
        if (x.length < len) {
            //move to constant
            return false;
        }
        return true;
    }
}