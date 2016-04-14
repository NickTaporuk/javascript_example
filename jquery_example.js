//==================================================================================
//      Pre_order form START
//==================================================================================
var pre_order = pre_order || {};
//color
pre_order = {"color": {"default": "blue"}};
//card color css
pre_order.cardColor = {
    "blue": {
        "background-image": "linear-gradient(0deg,#00308f 0,#5d89e1 100%)"
    },
    "silver": {
        "background-image": "none",
        "background-color": "rgb(209, 209, 209)"
    },
    "brown": {
        "background-image": "none",
        "background-color": "rgb(79, 45, 18)"
    },
    "black": {
        "background-image": "none",
        "background-color": "rgb(15, 15, 15)"
    }
};
// name
pre_order.name = '';
//email
pre_order.email = '';
// количество карточек
pre_order.count = 1;
// цена
pre_order.price = 45;
// price * count
pre_order.total;
// количество карточек
pre_order.quantity = pre_order.quantity || pre_order.price;
//
pre_order.colorNameDom = '[name="color-checker"]';
//
pre_order.colorNamePopupDom = '[name="dialog__color-checker"]';
//
pre_order.preOrderColor = '#pre_order__color';
//
pre_order.bewelItem = '.bewel-item';
//
pre_order.minusDom = '.btn-minus';
//
pre_order.plusDom = '.btn-plus';
//
pre_order.inputNumber = '.input-number';
//
pre_order.dialogTotalSumDom = '#dialog__total-sum';
//
pre_order.btnPreOrder = '.btn-pre-order';
//
pre_order.colorCheckersForm = '#color-checkers__form';
//
pre_order.dialogBewelItem = '.dialog__bewel-item';
//
pre_order.countMultiplyInput = '.count-multiply__input';
//
pre_order.countPriceInt = '#count_price__int';
//
pre_order.customCard = '.custom-card';
//
pre_order.dialogSubmit = '.dialog__submit';
//
pre_order.preOrderName = '#pre-order__name';
//
pre_order.preOrderEmail = '#pre-order__email';
//
pre_order.preOrderData = '#pre-order__data';

//
pre_order.init = function () {
    /** **/
    pre_order.setColor(pre_order.colorNameDom);
    /** **/
    pre_order.initColor(pre_order.color.default, pre_order.preOrderColor, pre_order.bewelItem);
    /** **/
    pre_order.setMinusCount(pre_order.minusDom, pre_order.inputNumber, pre_order.dialogTotalSumDom);
    /** **/
    pre_order.setPlusCount(pre_order.plusDom, pre_order.inputNumber, pre_order.dialogTotalSumDom);
    /** **/
    pre_order.openPopupEvent(pre_order.btnPreOrder, pre_order.colorCheckersForm, pre_order.dialogBewelItem, pre_order.countMultiplyInput, pre_order.countPriceInt, pre_order.dialogTotalSumDom);
    /** **/
    pre_order.selectColorPopupEvent(pre_order.colorNamePopupDom, pre_order.colorCheckersForm, pre_order.dialogBewelItem, pre_order.preOrderColor, pre_order.bewelItem, pre_order.customCard);
    /** **/
    pre_order.selectColorPopupEvent(pre_order.colorNameDom, pre_order.preOrderColor, pre_order.bewelItem, false, false, pre_order.customCard);
    /** **/
    pre_order.submitPreOrder(pre_order.dialogSubmit, pre_order.preOrderName, pre_order.preOrderEmail, pre_order.preOrderData);

};
/** **/
pre_order.setColor = function (name) {
    $(name).on('click', function () {
        pre_order.color.default = $(this).attr('value');
    });
};

/** **/
pre_order.setMinusCount = function (name, insert, dialog__total_sum) {
    $(name).on('click', function () {
        if (pre_order.count > 1) {
            pre_order.count -= 1;
            $(insert).val(pre_order.count);
            $(dialog__total_sum).html(pre_order.getQuantity(pre_order.price, pre_order.count));

        } else {/** events**/}
    });
};

/** **/
pre_order.setPlusCount = function (name, insert, dialog__total_sum) {
    $(name).on('click', function () {
        pre_order.count += 1;
        $(insert).val(pre_order.count);
        //console.log('pre_order.count Plus:',pre_order.count);
        $(dialog__total_sum).html(pre_order.getQuantity(pre_order.price, pre_order.count));
    });
};

/** **/
pre_order.openPopupEvent = function (popupNameButton, formColor, parentEl, countEl, count_price__int, dialog__total_sum) {
    $(popupNameButton).on('click', function () {
        // init color
        $(parentEl).removeClass('selected');
        $(formColor + ' .' + pre_order.color.default).closest(parentEl).addClass('selected');
        //init count
        $(countEl).val(pre_order.count);
        //init price
        $(count_price__int).html(pre_order.price);
        //init quantity
        $(dialog__total_sum).html(pre_order.getQuantity(pre_order.price, pre_order.count));

        $('.pin-container').removeClass('active');
    });
};

/** **/
pre_order.getQuantity = function (a, b) {
    return a * b;
};

/** **/
pre_order.selectColorPopupEvent = function (color, formColor, parentEl, formColorBind, parentElBind, customCard) {
    // set click color popup
    this.setColor(color);
    $(formColor + ' ' + parentEl).on('click', function () {

        $(parentEl).removeClass('selected');
        $(this).addClass('selected');

        //binding color landing
        if (!!formColorBind && !!parentElBind && !!customCard) {
            pre_order.initColor(pre_order.color.default, formColorBind, parentElBind, customCard);
        } else if (!!customCard) {
            pre_order.initColor(pre_order.color.default, false, false, customCard);
        }
    });
};

/** **/
pre_order.initColor = function (color, formColor, parentEl, customCard) {

    if (!!formColor && !!parentEl && !!customCard) {
        $(parentEl).removeClass('selected');
        $(formColor).find('.' + color).closest(parentEl).addClass('selected');
        $(customCard).css(pre_order.cardColor[color]);
    } else if (!!customCard) {
        $(customCard).css(pre_order.cardColor[color]);
    } else {
        $(formColor).find('.' + color).closest(parentEl).addClass('selected');
    }
};

/** **/
pre_order.resetData = function () {

};

/** **/
pre_order.submitPreOrder = function (name, formName, formEmail, formId) {
    $(name).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var nameFrm = $(formName),
            emailFrm = $(formEmail),
            formUrl = $(formId).prop('action'),
            formMethod = $(formId).prop('method');

        if (validate.rgxEmail(emailFrm.val())) {
            validate.errorNotVisible(emailFrm);
        } else {
            validate.errorVisible(emailFrm);
        }

        //validate email
        if (validate.rgxText(nameFrm.val())) {
            validate.errorNotVisible(nameFrm);
        } else {
            validate.errorVisible(nameFrm);
        }

        if (validate.rgxText(nameFrm.val()) && validate.rgxEmail(emailFrm.val())) {
            var formData = {
                "color": pre_order.color.default,
                "count": pre_order.count,
                "name": nameFrm.val(),
                "email": emailFrm.val(),
                "action": 'addNewPreOrder' // wp ajax variable
            };

            //Отправляем данные на сервер для проверки
            $.ajax({
                url: formUrl,
                type: formMethod,
                data: formData,
                success: function (data) {
                    var data = JSON.parse(data);

                    if (data.response == '1') {
                        console.log('data2', data);
                        succesPopup.open('#orderSuccess', '.success-message__overlay', '.success-message__contenet');
                        // init popup object add close event listener
                        var dlgtrigger = document.querySelector('[data-dialog]'),
                            somedialog = document.getElementById(dlgtrigger.getAttribute('data-dialog')),
                            dlg = new DialogFx(somedialog, {}, true);

                        dlg.close(dlg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error ajax method pre order");
                    console.log("xhr::", xhr, "::thrownError::", thrownError);
                }
            });
        }
    });
};

//==================================================================================
//      Pre_order form END
//==================================================================================


//==================================================================================
//      Validator form START
//==================================================================================
var validate = validate || {};
validate.regularText = /^[a-zA-Z]+$/;
validate.regularEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
//
validate.rgxText = function (str) {
    return (str.length > 0) ? validate.regularText.test(str) : false;
};
//
validate.rgxTextNotEmpty = function (str) {
    return (str.length > 0) ? true : false;
};
//
validate.rgxEmail = function (str) {
    return (str.length > 0) ? validate.regularEmail.test(str) : false;
};

validate.errorVisible = function (cls, textErrorClass, cssErrorClass) {
    cls.addClass('error');
    if (!!textErrorClass) {
        $(textErrorClass).css(cssErrorClass);
    }
};

validate.errorNotVisible = function (cls, textErrorClass, cssErrorClass) {
    cls.removeClass('error');
    if (!!textErrorClass) {
        $(textErrorClass).css(cssErrorClass);
    }
};
//==================================================================================
//      Validator form END
//==================================================================================

//==================================================================================
//      Notify Me form START
//==================================================================================
var notify_form = notify_form || {};
notify_form.email = '';
notify_form.emailId = '#soon_input';
notify_form.subminBtnName = '.sign-up__btn';
notify_form.formId = '#notify-me__form';
notify_form.errorInputId = '#sign-up__messageExist';
notify_form.errorCssVisible = {"display": "block"};
notify_form.errorCssNotVisible = {"display": "none"};
notify_form.checkEmailDb = false;
notify_form.notifySuccessIdPopup = "#notifySuccess";
notify_form.notifySuccessOverlayPopup = ".success-message__overlay";
notify_form.notifySuccessContentPopup = ".success-message__contenet";
/**
 * init functional
 * **/
notify_form.init = function () {
    notify_form.setEmail(notify_form.subminBtnName, notify_form.emailId, notify_form.formId);
};

/** **/
notify_form.setEmail = function (clk, email, formId) {

    var formUrl = $(formId).prop('action'),
        formMethod = $(formId).prop('method');

    $(clk).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var mail = $(email);
        //validation
        if (validate.rgxEmail(mail.val())) {
            validate.errorNotVisible(mail);
            var formData = {
                "email": mail.val(),
                "action": 'chackEmail'
            };
            //check whether there is a letter in the database
            //Отправляем данные на сервер для проверки
            $.ajax({
                url: formUrl,
                type: formMethod,
                data: formData,
                //async: false,
                success: function (data) {
                    var data = JSON.parse(data);
                    if (!!data.response) {
                        notify_form.checkEmailDb = data.response;
                        validate.errorVisible($(notify_form.emailId), notify_form.errorInputId, notify_form.errorCssVisible)
                    } else {
                        notify_form.checkEmailDb = false;
                        validate.errorNotVisible($(notify_form.emailId), notify_form.errorInputId, notify_form.errorCssNotVisible);
                        succesPopup.open(notify_form.notifySuccessIdPopup, notify_form.notifySuccessOverlayPopup, notify_form.notifySuccessContentPopup);
                        $(notify_form.emailId).val('');
                    }

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error notify ajax request");
                    console.log(xhr);
                }

            });

        } else {
            validate.errorVisible(mail);
        }
        //if ok ajax
        //else error
    });

    return false;
};

//debug Notefy Me
//==================================================================================
//      Notify Me form END
//==================================================================================

//==================================================================================
//      Success Popup form START
//==================================================================================
var succesPopup = succesPopup || {};
succesPopup.opacityVisible = {"opacity": 1, "display": "block"};
succesPopup.opacityHidden = {"opacity": 0};
/**
 * open
 *
 * @name            -
 * @overlayVisible    -
 * @contentVisible    -
 * **/
succesPopup.open = function (name, overlayVisible, contentVisible, timeout) {
    if (!timeout) {
        timeout = 2000;
    }

    $(name + ' ' + overlayVisible).css(succesPopup.opacityVisible);
    $(name + ' ' + contentVisible).css(succesPopup.opacityVisible);

    setTimeout(function () {
        succesPopup.close(name, overlayVisible, contentVisible)
    }, timeout);
};

/**
 * close
 *
 * @name            -
 * @overlayHidden    -
 * @contentHidden    -
 * **/
succesPopup.close = function (name, overlayHidden, contentHidden) {

    $(name + ' ' + overlayHidden).fadeOut("slow");
    $(name + ' ' + contentHidden).fadeOut("slow");
};
//==================================================================================
//      Success Popup form END
//==================================================================================

//==================================================================================
//      Callback form START
//==================================================================================
var callbackForm = callbackForm || {};

callbackForm.nameId = '#contactName';
callbackForm.emailId = '#contactEmail';
callbackForm.messageId = '#contactMessage';
callbackForm.submitId = '.btn-callback';
callbackForm.formId = '#contactForm';
callbackForm.contactUsSuccessIdPopup = '#contactUsSuccess';
callbackForm.contactUsSuccessOverley = '.success-message__overlay';
callbackForm.contactUsSuccessContent = '.success-message__contenet';
//init
callbackForm.init = function () {
    callbackForm.submitted(callbackForm.submitId, callbackForm.nameId, callbackForm.emailId, callbackForm.messageId, callbackForm.formId);
};

callbackForm.submitted = function (submitButtonId, nameId, emailId, messageId, formId) {
    $(submitButtonId).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        //validate
        var name = $(nameId),
            email = $(emailId),
            message = $(messageId),
            form = $(formId);

        if (validate.rgxText(name.val())) {
            validate.errorNotVisible(name);
        } else {
            validate.errorVisible(name);
        }

        if (validate.rgxTextNotEmpty(message.val())) {
            validate.errorNotVisible(message);
        } else {
            validate.errorVisible(message);
        }

        if (validate.rgxEmail(email.val())) {
            validate.errorNotVisible(email);
        } else {
            validate.errorVisible(email);
        }

        if (!!validate.rgxEmail(email.val()) && !!validate.rgxTextNotEmpty(message.val()) && !!validate.rgxEmail(email.val())) {

            var formData = {
                    "action": "addNewCallbackMessage",
                    "email": email.val(),
                    "message": message.val(),
                    "name": name.val()
                },
                formUrl = form.prop('action'),
                formMethod = form.prop('method');

            console.log('formUrl:', formUrl);
            console.log('formMethod:', formMethod);

            $.ajax({
                url: formUrl,
                type: formMethod,
                data: formData,
                success: function (data) {
                    var data = JSON.parse(data);

                    if (data.response == '1') {
                        succesPopup.open(callbackForm.contactUsSuccessIdPopup, callbackForm.contactUsSuccessOverley, callbackForm.contactUsSuccessContent);
                    }

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log("Error");
                    console.log(xhr);
                }

            });
        }
    });
};
//==================================================================================
//      Callback form END
//==================================================================================