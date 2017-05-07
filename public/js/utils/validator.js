/* globals toastr*/
import toastr from 'toastr';

export default class Validator {

    validateLen(x, nameOfValidateValue, len) {
        'use strict';
        if (x.length < len) {
            //move to constant
            toastr.error(`${nameOfValidateValue} should be at least ${len} signs`);
        }
    }
}