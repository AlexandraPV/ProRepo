  $(function() {
                                    $("input[id='form_fname']").blur(function validate(){
                                    el = $("input[id='form_fname']");
                                    inputString = el.val();
                                    if(inputString==""){
                                        $("#msg").css({ "color": "red", });
                                        $("#msg").html(" Вы должны заполнить поле");
                                    } else {
                                        $("#msg").css({ "color": "green", });
                                        $("#msg").html(" Ок");
                                    }
                              });
                                    $("input[id='form_sname']").blur(function validate(){
                                        el = $("input[id='form_sname']");
                                        inputString = el.val();
                                        if(inputString==""){
                                            $("#msg1").css({ "color": "red", });
                                            $("#msg1").html(" Вы должны заполнить поле");
                                        } else {
                                            $("#msg1").css({ "color": "green", });
                                            $("#msg1").html(" Ок");
                                        }
                                });
                                $("input[id='form_login']").blur(function validate(){
                                    el = $("input[id='form_login']");
                                    inputString = el.val();
                                    if(inputString==""){
                                        $("#msg2").css({ "color": "red", });
                                        $("#msg2").html(" Вы должны заполнить поле");
                                    } else {
                                        $("#msg2").css({ "color": "green", });
                                        $("#msg2").html(" Ок");
                                    }
                                      });
                                    $("input[id='form_email']").blur(function validate(){
                                        el = $("input[id='form_email']");
                                        inputString = el.val();
                                        if(inputString==""){
                                            $("#msg3").css({ "color": "red", });
                                            $("#msg3").html(" Вы должны заполнить поле");
                                        } else {
                                            $("#msg3").css({ "color": "green", });
                                            $("#msg3").html(" Ок");
                                        }
                                          });
                                        $("input[id='password']").blur(function validate(){
                                            el = $("input[id='password']");
                                            inputString = el.val();
                                            if(inputString==""){
                                                $("#msg4").css({ "color": "red", });
                                                $("#msg4").html(" Вы должны заполнить поле");
                                            } else {
                                                $("#msg4").css({ "color": "green", });
                                                $("#msg4").html(" Ок");
                                            }
                                              });
                                            $("input[id='password2']").blur(function validate(){
                                                el = $("input[id='password2']");
                                                inputString = el.val();
                                                if(inputString==""){
                                                    $("#msg5").css({ "color": "red", });
                                                    $("#msg5").html(" Вы должны заполнить поле");
                                                } else {
                                                    $("#msg5").css({ "color": "green", });
                                                    $("#msg5").html(" Ок");
                                                }
                                                  });
                                                $("input[id='form_phone']").blur(function validate(){
                                                    el = $("input[id='form_phone']");
                                                    inputString = el.val();
                                                    if(inputString==""){
                                                        $("#msg6").css({ "color": "red", });
                                                        $("#msg6").html(" Вы должны заполнить поле");
                                                    } else {
                                                        $("#msg6").css({ "color": "green", });
                                                        $("#msg6").html(" Ок");
                                                    }
                                                      });
                                                    $("input[id='form_about']").blur(function validate(){
                                                        el = $("input[id='form_about']");
                                                        inputString = el.val();
                                                        if(inputString==""){
                                                            $("#msg7").css({ "color": "red", });
                                                            $("#msg7").html(" Вы должны заполнить поле");
                                                        } else {
                                                            $("#msg7").css({ "color": "green", });
                                                            $("#msg7").html(" Ок");
                                                        }
                            });
  });


							(function( $ ){

                $(function() {

                  $('.rf').each(function(){
                    // Объявляем переменные (форма и кнопка отправки)
                	var form = $(this),
                        btn = form.find('.btn_submit');

                    // Добавляем каждому проверяемому полю, указание что поле пустое
                	form.find('.rfield').addClass('empty_field');

                    // Функция проверки полей формы
                    function checkInput(){
                      form.find('.rfield').each(function(){
                        if($(this).val() != ''  ){

                          // Если поле не пустое удаляем класс-указание
                		$(this).removeClass('empty_field');
                        } else {
                          // Если поле пустое добавляем класс-указание
                		$(this).addClass('empty_field');
                        }
                      });
                    }

                    // Функция подсветки незаполненных полей
                    function lightEmpty(){
                      form.find('.empty_field').css({'border-color':'#d8512d'});




                      // Через полсекунды удаляем подсветку
                      setTimeout(function(){
                        form.find('.empty_field').removeAttr('style');
                      },500);
                    }

                    // Проверка в режиме реального времени
                    setInterval(function(){
                      // Запускаем функцию проверки полей на заполненность
                	  checkInput();
                      // Считаем к-во незаполненных полей
                      var sizeEmpty = form.find('.empty_field').size();
                      // Вешаем условие-тригер на кнопку отправки формы
                      if(sizeEmpty > 0){
                        if(btn.hasClass('disabled')){
                          return false
                        } else {
                          btn.addClass('disabled')
                        }
                      } else {
                        btn.removeClass('disabled')
                      }
                    },500);

                    // Событие клика по кнопке отправить
                    btn.click(function(){
                      if($(this).hasClass('disabled')){
                        // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
                		lightEmpty();
                        return false
                      } else {
                        // Все хорошо, все заполнено, отправляем форму
                        form.submit();
                      }
                    });
                  });
                });

                })( jQuery );
