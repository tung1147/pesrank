angular.module('app')
        .filter('numberWithDot', function () {
            return function (number) {
                if (isNaN(number))
                    return 0;
                var parts = number.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                return parts.join(".");
            }
        })

        .filter('goldWithDot', function () {

            return function (number) {
                if (isNaN(number)) {
                    return number;
                } else {
                    var displayNumber, character;
                    var numberAbs = Math.abs(number)
                    if (numberAbs >= 10000000) {
                        displayNumber = numberWithDot(numberAbs/1000000);
                        character = "M";
                    } else if (numberAbs >= 10000) {
                        displayNumber = numberWithDot(numberAbs);
                        character = "";
                    } else {
                        displayNumber = numberWithDot(numberAbs);
                        character = "";
                    }
                    if (number < 0) {
                        displayNumber = "-" + displayNumber;
                    }
                    return displayNumber + character;
                }
            }
        })

        .filter('goldWithDot2', function ($rootScope) {

            return function (number) {
                if (isNaN(number)) {
                    return number;
                } else {
                    var displayNumber, character;
                    var numberAbs = Math.abs(number)
                    if (numberAbs >= 100000000) {
                        displayNumber = Global.numberWithDot(Math.floor(numberAbs / 1000000));
                        character = "M";
                    } else if (numberAbs >= 100000) {
                        displayNumber = Global.numberWithDot(Math.floor(numberAbs / 1000));
                        character = "K";
                    } else {
                        displayNumber = Global.numberWithDot(numberAbs);
                        character = "";
                    }
                    if (number < 0) {
                        displayNumber = "-" + displayNumber;
                    }
                    return displayNumber + character;
                }
            }
        })
        .filter('splitText', function () {
            return function (value) {
                return value.split(" ")[0];
            }
        })
        .filter('cardTL', function ($rootScope) {
            return function (cardValue) {
                if (cardValue < 44)
                    return cardValue + 8;
                return cardValue - 44;
            }
        });


function numberWithDot(x) {
    if (isNaN(x))
        return 0;
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
}
;