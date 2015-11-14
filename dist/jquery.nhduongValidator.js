/*
 *  jquery-boilerplate - v3.4.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "nhduongValidator",
				defaults = {
					fields : {},
					validators : {},
					required : {
						message : "The field is required"
					},
					regexp : {
						message : "The value is invalid"
					},
					greaterThan : {
						message : "The value need greater more"
					},
					identical : {
						message : "The value not match"
					},
					maxLength :{
						message : "The length of value need less more"
					},
					passRequired : false,
					passRegexp : false,
					passGreaterThan : false,
					passIdentical : false,
					passMaxLength : false
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
					var that =this;
					//disable the submit button
					$('#nhduongSubmit').addClass("disabled");
					//get the number of field have validation
					this.numOfFiedValidate = Object.keys(this.settings.fields).length;
					$(".form-control").change(function(){
						if(that.settings.fields[this.id]){
							that.validatorsHandler(this.id,that.settings.fields[this.id].validators);
							that.stateSubmit();
						}
					});
				},

				/**
				 * count the success field
				 * @returns {Number}
				 */
				countSuccess : function(){
					return $('.has-success').length;
				},

				/**
				 * State of submit button
				 */
				stateSubmit : function(){
					if(this.numOfFiedValidate == this.countSuccess()){
						$('#nhduongSubmit').removeClass("disabled");
					}else{
						$('#nhduongSubmit').addClass("disabled");
					}
				},

				/**
				 * Handle the behavior of all validator
				 * @param element
				 * @param validators
				 */
				validatorsHandler : function(element,validators){
					if(validators){
						var hasRequiredValidator = validators.required;
						var hasRegexpValidator = validators.regexp;
						var hasGreaterThanValidator = validators.greaterThan;
						var hasIdenticalValidator = validators.identical;
						var hasMaxLengthValidator = validators.maxLength;

						if(hasRequiredValidator){
							this.requireService($("#"+element),validators.required);
						}

						if(hasRegexpValidator){
							if(hasRequiredValidator){
								if(this.settings.passRequired){
									this.regexpService($("#"+element), validators.regexp);
								}
							}
						}

						if(hasGreaterThanValidator){
							if(hasRequiredValidator){
								if(this.settings.passRequired){
									if(hasRegexpValidator){
										if(this.settings.passRegexp){
											this.greaterThanService($("#"+element), validators.greaterThan);
										}
									}else{
										this.greaterThanService($("#"+element), validators.greaterThan);
									}

								}
							}else{
								this.greaterThanService($("#"+element), validators.greaterThan);
							}
						}

						if(hasIdenticalValidator){
							if(hasRequiredValidator){
								if(this.settings.passRequired){
									this.identicalService($("#"+element),validators.identical);
								}
							}else{
								this.identicalService($("#"+element),validators.identical);
							}
						}

						if(hasMaxLengthValidator){
							if(hasRequiredValidator){
								if(this.settings.passRequired){
									if(hasRegexpValidator){
										if(this.settings.passRegexp){
											this.maxLengthService($("#"+element),validators.maxLength);
										}
									}else{
										this.maxLengthService($("#"+element),validators.maxLength);
									}
								}
							}else{
								this.maxLengthService($("#"+element),validators.maxLength);
							}
						}



					}
				},

				/**
				 * Template for validator service
				 * @param isPass
				 * @param element
				 * @param message
				 * @param defaultMessage
				 */
				validatorServiceTemplate : function(isPass,element,message,defaultMessage){
					if(isPass){
						this.createHelpBlockSuccess(element);
					}else{
						if(message){
							this.createHelpBlockError(element,message);
						}else{
							this.createHelpBlockError(element,defaultMessage);
						}
					}
				},

				/**
				 * Required service, check the field is not empty
				 * @param element
				 * @param required
				 */
				requireService : function(element,required){
					var isRequired =  this.checkRequired(element);
					this.validatorServiceTemplate(isRequired,element,required.message,this.settings.required.message);
				},

				/**
				 * Regexp Service, check the field passed the regexp
				 * @param element
				 * @param regexp
				 */
				regexpService : function(element,regexp){
					var check = this.checkRegexp(element,regexp.regexp);
					this.validatorServiceTemplate(check,element,regexp.message,this.settings.regexp.message);
				},

				/**
				 * Greater than Service, check the field need greater than the value in validator
				 * @param element
				 * @param greaterThan
				 */
				greaterThanService : function(element,greaterThan){
					var check = this.checkGreaterThan(element,greaterThan.value);
					this.validatorServiceTemplate(check,element,greaterThan.message,this.settings.greaterThan.message);
				},

				/**
				 * Identical Service, check the field have same the value in validator
				 * @param element
				 * @param identical
				 */
				identicalService : function (element,identical) {
					var check = this.checkIdentical(element,identical.withField);
					this.validatorServiceTemplate(check,element,identical.message,this.settings.identical.message);
				},

				/**
				 * Max length Service, check the field length must be less than the value of the validator
				 * @param element
				 * @param maxLength
				 */
				maxLengthService : function (element,maxLength) {
					var check = this.checkMaxLength(element,maxLength.max);
					this.validatorServiceTemplate(check,element,maxLength.message,this.settings.maxLength.message);
				},

				/**
				 * Create the error status block
				 * @param element
				 * @param message
				 */
				createHelpBlockError : function(element,message){
					var hasFeedback = this.hasFeedback(element);
					var hasError = this.hasError(element);
					var hasSuccess = this.hasSuccess(element);
					//create error block
					var errMessage = '<div class="help-block with-errors">'+message+'</div>';
					//create icon for error message
					var errIcon = '<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>';
					if(hasFeedback){
						if(hasError){
							//Set message for error message
							element.siblings('.with-errors').text(message);
						}else{
							if(hasSuccess){
								//if has the feed-back class, will change from has-success to has-error class
								element.parent().removeClass("has-success").addClass("has-error");
								//change icon
								element.siblings('.form-control-feedback')
									.removeClass("glyphicon-ok")
									.addClass("glyphicon-remove")
									.after(errMessage);
							}
						}
					}else{

						//add class for parent of element
						element.parent().addClass("has-error has-feedback");
						//add block error after element
						element.after(errIcon+errMessage);
					}
				},

				/**
				 * Create the success status block
				 * @param element
				 */
				createHelpBlockSuccess : function(element){
					var hasFeedback = this.hasFeedback(element);
					var hasError = this.hasError(element);
					if(hasFeedback){
						if(hasError){
							//if has the feed-back class, will change from has-error to has-success class
							element.parent().removeClass("has-error").addClass("has-success");
							//remove the error trigger class
							element.siblings('.with-errors').remove();
							//change icon
							element.siblings('.form-control-feedback')
								.removeClass("glyphicon-remove")
								.addClass("glyphicon-ok");
						}
					}else{
						//create success icon
						var successIcon = '<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>';
						//add class for parent of element
						element.parent().addClass("has-success has-feedback");
						//add the icon after element
						element.after(successIcon);
					}
				},

				/**
				 * Check the {element} have has-error class
				 * @param element
				 * @returns {*}
				 */
				hasError : function (element) {
					return element.parent().hasClass("has-error");
				},

				/**
				 * Check the {element} have has-success class
				 * @param element
				 * @returns {*}
				 */
				hasSuccess : function (element) {
					return element.parent().hasClass("has-success");
				},

				/**
				 * Check the parent container have the has-feedback class
				 * @param element
				 * @returns {*}
				 */
				hasFeedback : function (element) {
					return element.parent().hasClass("has-feedback");
				},


				checkRequired : function(element){
					var result =  element.val() != "";
					this.settings.passRequired = result;
					return result;
				},
				checkRegexp :function(element,reg){
					var value = element.val();
					var regExp = new RegExp(reg);
					var result = regExp.test(value);
					this.settings.passRegexp = result;
					return result;
				},
				checkGreaterThan :  function(element,checkValue){
					var value = element.val();
					var result = parseInt(value) >= checkValue;
					this.settings.passGreaterThan = result;
					return result;
				},

				checkIdentical : function(element,elementToCompare){
					var value = element.val();
					var valueToCompare = $("#"+elementToCompare).val();
					var result = value==valueToCompare;
					this.settings.passIdentical = result
					return result;
				},

				checkMaxLength : function(element,maxLength){
					var value = element.val();
					var result = (value.length <= maxLength);
					this.settings.passMaxLength = result;
					return result;
				}


		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
