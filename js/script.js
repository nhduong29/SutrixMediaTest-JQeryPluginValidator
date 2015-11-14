$(function() {
    $("#validator").nhduongValidator({
        fields: {
            firstName : {
                validators : {
                    required : {
                        message : "The first name is required"
                    }
                }
            },
            lastName : {
                validators: {
                    required: {
                        message: "The last name is required"
                    }
                }
            },
            age :{
                validators:{
                    required: {
                        message: "The age is required"
                    },

                    regexp :{
                        message: 'The age must be the numeric',
                        regexp: /^[0-9]*$/
                    },

                    greaterThan : {
                        value : 21,
                        message: "The value must be greater than or equal to 21"
                    }
                }
            },
            phone : {
                validators: {
                    required: {
                        message: "The phone number is required"
                    },
                    regexp :{
                        message: 'The phone number can only contain the digits, spaces, -, (, ), + and .',
                        regexp: /^[0-9\s\-()+\.]+$/
                    }
                }
            },
            email :{
                validators: {
                    required:{
                        message: "The email is required"
                    },
                    regexp :{
                        message: 'Bruh, that email address is invalid',
                        regexp: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
                    }
                }
            },
            passw : {
                validators:{
                    required: {
                        message: "The password is required"
                    },
                    regexp: {
                        message: "The password must contain at least one digit/lowercase/uppercase letter and be at least six characters long",
                        regexp: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
                    }
                }
            },

            passwConfirm :{
                validators:{
                    required: {
                        message: "The password is required"
                    },
                    identical :{
                        withField : "passw",
                        message: "The password confirm are not the same with the password"
                    }
                }
            },

            message :{
                validators:{
                    required:{
                        message: "The message is required"
                    },
                    maxLength :{
                        max: 200,
                        message: 'The message must be less than 200 characters'
                    }
                }
            }

        }
    });
});