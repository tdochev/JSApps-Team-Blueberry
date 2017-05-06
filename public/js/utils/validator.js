/* globals toastr*/
import toastr from 'toastr';

export function validateLen(x, nameOfValidateValue, len) {
    'use strict';
    if (x.length < len) {
        toastr.error(`${nameOfValidateValue} should be at least ${len} signs`);
    }
}