/**
 * 表单控件
 */
$().extend('serialize',function () {
    for(var i = 0; i <this.elements.length ; i++){
        var form = this.elements[i];
        var parts = {};
        for(var k = 0 ; k< form.elements.length ; k++){
            var filed = form.elements[k];
            switch (filed.type){
                case 'undefined':
                case 'submit':
                case 'reset':
                case 'file':
                case 'button':
                    break;
                case 'radio':
                case 'checkbox':
                    if(! filed.selected)
                        break;
                case 'select-one':
                case 'selece-multiple':
                    for(var j = 0;j < filed.options.length;j++){
                        var option = filed.options[j];
                        if(option.selected){
                            var optValue = '';
                            if(option.hasAttribute){
                                optValue = (option.hasAttribute('value') ? option.value:option.text);
                            }else {
                                // 兼容浏览器用的
                                optValue = (option.attributes('value').specified ? option.value:option.text);
                            }
                            parts[filed.name] = optValue;
                        }
                    }
                    break;
                default:
                    parts[filed.name] = filed.value;
            }
        }
    }
    return parts;
})













