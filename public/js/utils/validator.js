/* globals toastr*/
var validator = (function() {
    'use strict';

    function validateLen(x, nameOfValidateValue, len) {
        if (x.length < len) {
            toastr.error(`${nameOfValidateValue} should be at least ${len} signs`);
        }
    }

    return {
        validateLen: validateLen,
    };
}());