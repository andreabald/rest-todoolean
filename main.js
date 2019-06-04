$(document).ready(function(){
  var url_base = 'http://157.230.17.132:3001/todos/'

  visualizza_todo(url_base);
  
  $('#link_new_todo').click(function(){
    aggiungi_todo(url_base);
  });

  $('ul.list').on('click', 'i', function(){
    var todo_da_eliminare = $(this).parent('li').attr('data-id');
    elimina_todo(url_base, todo_da_eliminare);
  });

  $('#link_edit_todo').click(function(){
    var todo_modificato = $('#input_edit_todo').val();
    var todo_selezionato = $('select').val();

    if(todo_modificato.length > 0){
      modifica_todo(url_base, todo_modificato, todo_selezionato);
    };
  });



  // FUNZIONI

  function visualizza_todo(url){
    var list_item = $('#template_list').html();
    var template_list_item_function = Handlebars.compile(list_item);

    var list_item_select = $('#template_select').html();
    var template_list_item_select_function = Handlebars.compile(list_item_select);

    $('ul.list').empty();
    $('select').empty();

    $.ajax({
      url: url,
      method: 'GET',
      success: function(data){

        var item_list;
        $('select').append('<option value = "">Seleziona</option>');

        for (var i = 0; i < data.length; i++) {
          item_list = {
            "id": data[i].id,
            "todo": data[i].text
          }
          var html = template_list_item_function(item_list);
          $('ul.list').append(html);

          var html2 = template_list_item_select_function(item_list);
          $('select').append(html2);
        }
      },
      error: function(){
        alert('errore');
      }
    });
  };

  function aggiungi_todo(url){
    var input_todo = $('#input_new_todo').val();
    $.ajax({
      url: url,
      method: 'POST',
      data: {
        "text": input_todo
      },
      success: function(data){
        visualizza_todo(url);
      },
      error: function(){
        alert('errore');
      }
    });
  };

  function elimina_todo(url, id_todo){
    $.ajax({
      url: url + id_todo,
      method: 'DELETE',
      success: function(data){
        visualizza_todo(url);
      },
      error: function(){
        alert('errore');
      }
    });
  }

  function modifica_todo(url, testo_da_inserire, id_todo){
    $.ajax({
      url: url + id_todo,
      method: 'PUT',
      data: {
        "text": testo_da_inserire
      },
      success: function(data){
        visualizza_todo(url);
      },
      error: function(){
        alert('errore');
      }
    });
  };
});
