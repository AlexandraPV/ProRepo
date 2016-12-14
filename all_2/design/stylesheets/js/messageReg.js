  $(function() {
                                    $("input[id='form_fname']").blur(function validate(){
                                    el = $("input[id='form_fname']");
                                    inputString = el.val();
                                    if(inputString==""){
                                        $("#msg").css({ "color": "red", });
                                        $("#msg").html("Ви повинні заповнити поле");
                                    }else if(! (/^[a-zA-Zа-яА-Я]+$/.test(inputString))){
                                      $("#msg").css({ "color": "red", });
                                      $("#msg").html("Мають бути введені тільки букви");
                                    }
                                    else {
                                        $("#msg").css({ "color": "green", });
                                        $("#msg").html(" Ок");
                                    }
                              });
                                    $("input[id='form_sname']").blur(function validate(){
                                        el = $("input[id='form_sname']");
                                        inputString = el.val();
                                        if(inputString==""){
                                            $("#msg1").css({ "color": "red", });
                                            $("#msg1").html("Ви повинні заповнити поле");
                                        }else   if(! (/^[a-zA-Zа-яА-Я]+$/.test(inputString))){
                                            $("#msg1").css({ "color": "red", });
                                            $("#msg1").html("Мають бути введені тільки букви");
                                          }
                                         else {
                                            $("#msg1").css({ "color": "green", });
                                            $("#msg1").html(" Ок");
                                        }
                                });
                                $("input[id='form_login']").blur(function validate(){
                                    el = $("input[id='form_login']");
                                    inputString = el.val();
                                    if(inputString==""){
                                        $("#msg2").css({ "color": "red", });
                                        $("#msg2").html("Ви повинні заповнити поле");
                                    }else
                                   if(! (/^[a-zA-Z0-9]+$/.test(inputString))){
                                    $("#msg2").css({ "color": "red", });
                                    $("#msg2").html("Мають бути введені тільки латинські букви або цифри");
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
                                            $("#msg3").html("Ви повинні заповнити поле");
                                        }else if(! (/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test(inputString))){
                                          $("#msg3").css({ "color": "red"});
                                          $("#msg3").html("Неправильный запис email");
                                        }
                                        else {
                                            $("#msg3").css({ "color": "green", });
                                            $("#msg3").html(" Ок");
                                        }
                                          });
                                        $("input[id='password']").blur(function validate(){
                                            el = $("input[id='password']");
                                            inputString = el.val();

                                            if(inputString==""){
                                                $("#msg4").css({ "color": "red", });
                                                $("#msg4").html("Ви повинні заповнити поле");
                                            }else if(inputString.length < 6){
                                              $("#msg4").css({ "color": "red", });
                                              $("#msg4").html("Пароль повинен складатися мінімум із 6 символів");
                                            }
                                             else {
                                                $("#msg4").css({ "color": "white", });
                                                $("#msg4").html(" Ок");
                                            }
                                              });
                                            $("input[id='password2']").blur(function validate(){
                                                el = $("input[id='password2']");
                                                el1 = $("input[id='password']");
                                                inputString12 = el1.val();
                                                inputString = el.val();
                                                if(inputString==""){
                                                    $("#msg5").css({ "color": "red", });
                                                    $("#msg5").html("Ви повинні заповнити поле");
                                                }else if(inputString!=inputString12){

                                                  $("#msg5").css({ "color": "red", });
                                                  $("#msg5").html("Повторний пароль неправильний");
                                                } else if(inputString==inputString12){
                                                  $("#msg4").css({ "color": "green", });
                                                  $("#msg4").html(" Ок");
                                                  $("#msg5").css({ "color": "white", });
                                                  $("#msg5").html("");
                                                }
                                                  });
                                                $("input[id='form_phone']").blur(function validate(){
                                                    el = $("input[id='form_phone']");
                                                    inputString = el.val();
                                                    if(inputString==""){
                                                        $("#msg6").css({ "color": "red", });
                                                        $("#msg6").html("Ви повинні заповнити поле");
                                                    }else
                                                   if(!(/^0[0-9]{9}$/.test(inputString))){
                                                    $("#msg6").css({ "color": "red", });
                                                    $("#msg6").html("Номер має складатися з 9 цифр (починатися з 0)");
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
                                                            $("#msg7").html("Ви повинні заповнити поле");
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
                        if($(this).val() != ''){
                           
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
                      el = $("input[id='password']");
                      inputString = el1.val();
                      el1 = $("input[id='password2']");
                      inputString12 = el1.val();
                      if(inputString!=inputString12){

                      }

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
