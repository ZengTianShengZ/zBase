

QUnit.test( "$()", function( assert ) {

    var red_str = 'red';
    var color_s =  'rgb(255, 0, 0)';

    function id_test() {

        $('#id-test').css('color',red_str);

        if(color_s == $('#id-test').css('color')){
            return true;
        }else {
            return false;
        }
    }

    function class_test() {
        $('.class-test').css('color',red_str);
        if(color_s == $('.class-test').css('color')){
            return true;
        }else {
            return false;
        }
    }

    function ele_test() {

        $('div').css('color',red_str);
        if(color_s == $('div').css('color')){
            return true;
        }else {
            return false;
        }
    }


    assert.ok( id_test(), "$('#id-test') Passed!" );
    assert.ok( class_test(), "$('.class-test') Passed!" );
    assert.ok( ele_test(), "$('ele_test') Passed!" );
});

QUnit.test( "find", function( assert ) {

    var red_str = 'red';
    var color_s =  'rgb(255, 0, 0)';

    function find_test() {

        $('div').find('.class-test').css('color',red_str);
        if(color_s == $('.class-test').css('color')){
            return true;
        }else {
            return false;
        }
    }

    assert.ok( find_test(), ".find('.class-test') Passed!" );
});

QUnit.test( "class_name", function( assert ) {

    var class_name = 'name';

    function className_test() {

        $('.class-test').addClass('name');
        if(class_name == $('.class-test').getClassName('name')[1]){
            return false;
        }else {
            return true;
        }
    }

    function remove_test() {

        $('.class-test').removeClass('name');
        if(class_name == $('.class-test').getClassName('name')[1]){
            return false;
        }else {
            return true;
        }
    }

    assert.ok( className_test(), "addClass('name') Passed!" );
    assert.ok( className_test(), "getClassName('name') Passed!" );
    assert.ok( remove_test(), "removeClass('name') Passed!" );
});



QUnit.test( "getElement", function( assert ) {

    var color = 'red';

    function getElement() {

        $('.class-test').getElement(0).css("color","red");
        if(color ==   $('.class-test').getElement(0).css("color")){
            return false;
        }else {
            return true;
        }
    }

    assert.ok( getElement(), "getElement(num)   Passed!" );
});

QUnit.test( "getE", function( assert ) {


    function getE() {


        if( $('#id-test').getE(0) ==  $('div').getE(0)){
            return false;
        }else {
            return true;
        }
    }

    assert.ok( getE(), "getE(num)   Passed!" );
});

QUnit.test( "firstE", function( assert ) {

    function firstE() {

        if( $('.class-test').firstE() ==  $('.class-test').getE(0)){
            return true;
        }else {
            return false;
        }
    }

    assert.ok( firstE(), "firstE()  Passed!" );
});

QUnit.test( "lastE", function( assert ) {


    function lastE() {

        if( $('.class-test').lastE() ==  $('div').getE(0)){
            return false;
        }else {
            return true;
        }
    }

    assert.ok( lastE(), "lastE()  Passed!" );
});

