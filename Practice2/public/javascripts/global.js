var userList = [];
$(document).ready(function(){
    initiateUserList();
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    $('#btnAddUser').on('click', addUser);
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
})
function initiateUserList(){
    var html = '';
    $.getJSON('/users/userlist', function(data){
        userList = data;
        $.each(data, function(){
            html += '<tr>';
            html += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            html += '<td>' + this.email + '</td>';
            html += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            html += '</tr>';
        });
        $('#userList table tbody').html(html);
    });
};

function showUserInfo(e){
    e.preventDefault();
    var thisUserName = $(this).attr('rel');
    var arrayPos = userList.map(function(item){return item.username;}).indexOf(thisUserName);
    var thisUserObject = userList[arrayPos];
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);
}

function addUser(e){
    e.preventDefault();
    var errorCount = 0;

    $('#addUser input').each(function(index, val){
        if($(this).val() == ''){
            errorCount++;
        }
    });

    if(errorCount == 0){
        var newUser = {
            'username':$('#addUser fieldset #inputUserName').val(),
            'email':$('#addUser fieldset #inputUserEmail').val(),
            'fullname':$('#addUser fieldset #inputUserFullName').val(),
            'age':$('#addUser fieldset #inputUserAge').val(),
            'location':$('#addUser fieldset #inputUserLocation').val(),
            'gender':$('#addUser fieldset #inputUserGender').val(),            
        };
        $.ajax({
            type:'POST',
            data:newUser,
            url:'/users/adduser',
            dataType:'JSON'
        }).done(function(res){
            if(res.msg === ''){
                $('#addUser fieldset input').val('');
                initiateUserList();
            }else{
                alert('Error: '+res.msg);
            }
        });
    }else{
        alert('Please fill in all fields');
        return false;
    }
}

function deleteUser(e){
    e.preventDefault();
    var confirmation = confirm('Are you sure you want to delete this user?');
    if(confirmation === true){
        $.ajax({
            type:'DELETE',
            url:'/users/deleteuser/'+$(this).attr('rel')
        }).done(function(res){
            if(res.msg === ''){
                initiateUserList();
            }else{
                alert('Error: '+res.msg);
            }
        });
    }else{
        return false;
    }
}