  $(function() {
                                    $("input[id='name']").blur(function validate(){
                                    el = $("input[id='name']");
                                    inputString = el.val();
                                    if(inputString==""){
                                        $("#msg").css({ "color": "red", });
                                        $("#msg").html(" Вы должны заполнить поле");
                                    } else {
                                        $("#msg").css({ "color": "green", });
                                        $("#msg").html(" Ок");
                                    }
                              });
                                    $("input[id='founder']").blur(function validate(){
                                        el = $("input[id='founder']");
                                        inputString = el.val();
                                        if(inputString==""){
                                            $("#msg1").css({ "color": "red", });
                                            $("#msg1").html(" Вы должны заполнить поле");
                                        } else {
                                            $("#msg1").css({ "color": "green", });
                                            $("#msg1").html(" Ок");
                                        }
                                });
                                $("input[id='date']").blur(function validate(){
                                    el = $("input[id='date']");
                                    inputString = el.val();
                                    if(inputString==""){
                                        $("#msg2").css({ "color": "red", });
                                        $("#msg2").html(" Вы должны заполнить поле");
                                    }else  if (!(/(\d{4})-(\d{1,2})-(\d{1,2})/.test(inputString))){
                                          $("#msg2").css({ "color": "red", });
                                          $("#msg2").html("Формат дати YYYY-MM-DD");
                                      } else {
                                        $("#msg2").css({ "color": "green", });
                                        $("#msg2").html(" Ок");
                                    }
                                      });
                                    $("input[id='staf']").blur(function validate(){
                                        el = $("input[id='staf']");
                                        inputString = el.val();
                                        if(inputString==""){
                                            $("#msg3").css({ "color": "red", });
                                            $("#msg3").html(" Вы должны заполнить поле");
                                        }else
                                       if(!(/[0-9]$/.test(inputString))){
                                        $("#msg3").css({ "color": "red", });
                                        $("#msg3").html("Мають бути тільки цифри");
                                      } else {
                                            $("#msg3").css({ "color": "green", });
                                            $("#msg3").html(" Ок");
                                        }
                                          });
                                        $("input[id='cost']").blur(function validate(){
                                            el = $("input[id='cost']");
                                            inputString = el.val();
                                            if(inputString==""){
                                                $("#msg4").css({ "color": "red", });
                                                $("#msg4").html(" Вы должны заполнить поле");
                                            }else
                                           if(!(/[0-9]$/.test(inputString))){
                                            $("#msg4").css({ "color": "red", });
                                            $("#msg4").html("Мають бути тільки цифри");
                                          } else {
                                                $("#msg4").css({ "color": "green", });
                                                $("#msg4").html(" Ок");
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
