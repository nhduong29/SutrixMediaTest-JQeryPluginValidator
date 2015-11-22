# nhduongValidator
# jQuery Plugin Validator

nhduongValidator is the jQuery plugin makes simple clientside form validation easy.
* This makeup work base on Bootsatrap 3
* Validate by id

## Demo [jQuery Plugin Validator By Duong Nguyen]

## Installation & Usage
### Step 1: Link required files

> First and most important, the jQuery library needs to be included. Next, download the package from this site and link the the Javascript file "jquery.nhduongValidator.js".
```sh
<!-- jQuery library (served from Google) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<!-- nhduongValidator Javascript file -->
<script src="/js/jquery.nhduongValidator.js"></script>
```
> The mockups work base on Boostrap 3, therefore, we need add the boostrap lib into your project:
```sh
<link href="css/bootstrap.css" rel="stylesheet">
<!-- Custom Fonts for icons -->
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
```

### Step 2: Create HTML tag

> This plugin work with bootstrap form. Create the form then add the input need validate

- The attribute "id" is require
- The input form need contain by another container (Suggess using "form-group" of bootstrap to have nice the UI)

Create the form:
```sh
<form id="validator" role="form">
```
Create the input
```sh
<div class="form-group">
    <label for="firstName" class="control-label">First Name (*)</label>
	<input type="text" class="form-control " id="firstName" name="firstName" placeholder="First Name">
</div>
```
### Step 3: Setup the nhduongValidator

> This plugin using the Json object to setting

```sh
$("#validator").nhduongValidator(objectValidator);
```
The "objectValidator" is the object contain all fields we need validate
```sh
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
            }
        }
        });
```
All fields have validate will be declare inside of "fields", each field  will declare the validator inside of "validators"

## Validators provide
> I provide 5 basic validator: required, regexp, greaterThan, identical, maxLength. All of them have the  "message" key to config the messsage appear on error messages box
* required : The value must be not empty:
```sh
required: {
        message: "The age is required"
    }
```
* regexp : The value must be pass the "regexp"
```sh
regexp :{
        message: 'The age must be the numeric',
        regexp: /^[0-9]*$/
    },
```
* greaterThan : The value must be greater than the special "value":
```sh
greaterThan : {
    value : 21,
    message: "The value must be greater than or equal to 21"
}
```
* identical : The value must be same the special value ("withField"):
```sh
identical :{
    withField : "passw",
    message: "The password confirm are not the same with the password"
}
```
* maxLength : The field's length must be less than the value of the special value ("max") :
```sh
 maxLength :{
    max: 200,
    message: 'The message must be less than 200 characters'
}
```

License
----

Released under the MIT license - http://opensource.org/licenses/MIT Let's get on with it!

[jQuery Plugin Validator By Duong Nguyen]: <http://nhduong29.github.io/SutrixMediaTest-JQeryPluginValidator/>


