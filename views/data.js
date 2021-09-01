$(document).ready(function(){
    alert("Application start");
  getdata();

function getdata(){
    $.ajax({
    url:'/adminRoutes/getteacherRegister',
    method:'get',
    dataType:'json',
    success:function(response){
    if(response.msg=='success'){
    $('tr.taskrow').remove()
    if(response.data==undefined || response.data==null || response.data==''){
    $('.tblData').hide();
    }else{
    $('.tblData').show();
    $.each(response.data,function(index,data){
    var url = url+data._id;
    index+=1;
    $('tbody').append("<tr class='taskrow'><td>"+ index +"</td><td>"+data.email+"</td><td>"+"<button class='del' value='"+data._id+"'>delete</button>"+"</td></tr>");
    });
    }
    }
    },
    error:function(response){
    alert('server error');
    }
    });
    }
});