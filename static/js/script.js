function goToCard() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('mobile');}
        else{location.href = window.location.pathname.toString().slice(0,1)+"hafilati-app/what-is-hafilati-app"; }
       
}

function goToLines() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('mobile');}
        else{location.href = window.location.pathname.toString().slice(0,1)+"lines/26"; }
    
}

function goToTiming() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('mobile');}
        else{location.href = window.location.pathname.toString().slice(0,1)+"timing/26"; }
    
}

function goToAbout() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('mobile');}
        else{location.href = window.location.pathname.toString().slice(0,1)+"about/etus"; }
     
}
function goTostats() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('mobile');}
        else{location.href = window.location.pathname.toString().slice(0,1)+"stats"; }
     
}
function goTomain() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('mobile');}
        else{location.href = window.location.pathname.toString().slice(0,1)+""; }
     
}
function goToServices() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        console.log('mobile');}
        else{location.href = window.location.pathname.toString().slice(0,1)+"services/service1"; }
    
}


function clickTabs(item) {
    
  
    if ( typeof item == 'undefined' || item == '' )
    {    
        if(window.location.pathname.toString().split('/')[2] == 'hafilati-app')
        {   
          
            document.getElementById("v-pills-why").classList.add("active");
            document.getElementById("v-pills-why").classList.add("show");
            document.getElementById('v-pills-why-tab').classList.add("active");
        }
       
        if(window.location.pathname.toString().split('/')[2] == 'lines')
        {   
          
            document.getElementById("v-pills-26").classList.add("active");
            document.getElementById("v-pills-26").classList.add("show");
            document.getElementById('v-pills-26-tab').classList.add("active");
        }
        if(window.location.pathname.toString().split('/')[2] == 'timing')
        {   
          
            document.getElementById("v-pills-26").classList.add("active");
            document.getElementById("v-pills-26").classList.add("show");
            document.getElementById('v-pills-26-tab').classList.add("active");
        }
        if(window.location.pathname.toString().split('/')[2] == 'about')
        {   
          
            document.getElementById("v-pills-etus").classList.add("active");
            document.getElementById("v-pills-etus").classList.add("show");
            document.getElementById('v-pills-etus-tab').classList.add("active");
        }
        if(window.location.pathname.toString().split('/')[2] == 'services')
        {   
          
            document.getElementById("v-pills-service1").classList.add("active");
            document.getElementById("v-pills-service1").classList.add("show");
            document.getElementById('v-pills-service1-tab').classList.add("active");
        }
    }
        
    var name = "v-pills-"+item
    document.getElementById(name).classList.add("active");
    document.getElementById(name).classList.add("show");
    document.getElementById(name+"-tab").classList.add("active");
    
    
    // document.getElementById(name).click()
    
}

function changeUrl(url) {
    history.pushState(null, null, url);
}


function changeLang(lang) {
    var url = window.location.pathname.toString();    
    window.location.pathname = "/"+lang+url.slice(3,)
      
} 

function logIn() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    if(password && email)
    {
        $.post("/administration/connect",
                {
                    email: email,
                    password: password
                },
                function(data, status){
                    if (data == "fff")
                    {   
                        
                        location.href = '/administration/dashboard'
                    }
                    else
                    {
                        document.getElementById("error").innerHTML = "Email Or Password Incorrect"
                    }
                });
            
    }
    else
    {
        alert("All fields must be filled")
    }
}

function logOut() {
    $.get("/administration/logout", function(data, status){
        if (data == "fff")
        {   
           
            location.href = '/administration/login'
        }
      });
}



function addUser() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var confirmPassword = document.getElementById("confirmPassword").value

    if(password && email && confirmPassword)
    {   
        
        if (password == confirmPassword)
        {
            $.post("/administration/adduser",
                    {
                        email: email,
                        password: password
                    },
                    function(data, status){
                        if (data == "fff")
                        {   showUsers()
                            alert("User Added")                            
                            
                            document.getElementById("email").value =""
                            document.getElementById("password").value=""
                            document.getElementById("confirmPassword").value=""
                        }
                        else
                        {
                            document.getElementById("emailError").innerHTML = "Email already exists"
                        }
                    });
        }
        else{
            alert("Please check your password confirmation")

        }
            
    }
    else
    {
        alert("All fields must be filled")
    }
}

function deleteUser(id) {
    $.ajax({
        url: `/administration/deleteuser/${id}`,
        type: 'DELETE',
        success: function(result) {
            alert(result)
            showUsers() 
        }
    });
}
function showUsers() {
    $.get("/administration/allusers", function(data, status){
        document.getElementById("userList").innerHTML =""
        for (i in data)
                        {   
                           
                            document.getElementById("userList").innerHTML +=    `<tr>
                                                                                    <td>${data[i].etusEmailField}</td>
                                                                                    <td>***********</td>
                                                                                    <td><i class="fa fa-trash mb-2" onclick ="deleteUser(${data[i].id})" style="font-size:20px;color: white;cursor:pointer;"></i></td>
                                                                                </tr> `
                           
                        }
      });
}

var allPosts = []

function showPosts() {
    $.get("/administration/allposts", function(data, status){
        allPosts = data
        document.getElementById("PostList").innerHTML =""
        var bgColor = ""
        for (i in data)
                        {   
                           
                            if (data[i].actif =="1")
                                bgColor ='style = "background-color: #ff4d60;"'
                            

                        
                            document.getElementById("PostList").innerHTML +=    `<tr ${bgColor}>
                                                                                    <td>${data[i].titleFr}</td>
                                                                                    <td>${data[i].descFr}</td>
                                                                                    <td>${data[i].image}</td>
                                                                                    <td>${data[i].postDate}</td>
                                                                                    <td>
                                                                                        <i class="fa fa-eye mr-3 mb-2" data-toggle="modal" data-target="#editPostModal"onclick ="showPost(${i})" style="font-size:20px;color: white;cursor:pointer;"></i>
                                                                                        <i class="fa fa-trash mb-2" onclick ="deletePost(${data[i].id})" style="font-size:20px;color: white;cursor:pointer;"></i>
                                                                                        </td>
                                                                                </tr> `
                        bgColor = ""
                        }
      });
}

function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }
  
  


function addPost() {

    var postTitleFr = document.getElementById("postTitleFr").value
    var postDescFr = document.getElementById("postDescFr").innerHTML
    var postTitleAr = document.getElementById("postTitleAr").value
    var postDescAr = document.getElementById("postDescAr").innerHTML
    var image = document.getElementById("image").files[0]
     

    var date = new Date();
    var month = pad2(date.getMonth()+1);
    var day = pad2(date.getDate());
    var year= date.getFullYear();
    
    var postDate =  day+"/"+month+"/"+year;
    
    var formData = new FormData();
    formData.append('postTitleFr', postTitleFr) 
    formData.append('postDescFr', postDescFr) 
    formData.append('postTitleAr', postTitleAr) 
    formData.append('postDescAr',postDescAr )
    formData.append('postDate', postDate) 
    formData.append('image', image)
    formData.append('actif', '0')

    if(postTitleFr && postDescFr && postTitleAr && postDescAr)
    {   


        if (image)
            {
                formData.append('imageName', image.name)
            }
        else
            {
                formData.append('imageName', "")
            }

        $.ajax({
            url: "/administration/addpost",
            type: 'POST',
            data:formData,
            processData: false, 
            contentType: false,
            success: function(data) {
                if (data == "fff")
                    {   
                                
                        showPosts()
                        alert("Post Added")        
                        
                        document.getElementById("postTitleFr").value =""
                        document.getElementById("postDescFr").innerHTML=""
                        document.getElementById("postTitleAr").value=""
                        document.getElementById("postDescAr").innerHTML=""
                        document.getElementById("image").value=""


                    }
                else
                {
                    alert("Error occured")
                }
            }
        });
      
       
            
    }
    else
    {
        alert("All fields must be filled")
    }





}

function deletePost(id) {
    $.ajax({
        url: `/administration/deletepost/${id}`,
        type: 'DELETE',
        success: function(result) {
            
            showPosts() 
            alert(result)
        }
    });
}




function showPost(i) {

    document.getElementById("editPostTitleFr").value = allPosts[i].titleFr
    document.getElementById("editPostDescFr").innerHTML = allPosts[i].descFr
    document.getElementById("editPostTitleAr").value = allPosts[i].titleAr
    document.getElementById("editPostDescAr").innerHTML = allPosts[i].descAr
    document.getElementById("id").value = allPosts[i].id

    

    if (allPosts[i].actif === "1")

    {   
        
        document.getElementById("actif").checked = true;
    }
    else
    {
        document.getElementById("actif").checked = false;
    }
  
}



function editPost() {

    
    

    var editPostTitleFr = document.getElementById("editPostTitleFr").value
    var editPostDescFr = document.getElementById("editPostDescFr").innerHTML
    var editPostTitleAr = document.getElementById("editPostTitleAr").value
    var editPostDescAr = document.getElementById("editPostDescAr").innerHTML
    var id = document.getElementById("id").value
    var actif = document.getElementById('actif').checked ? '1' : '0'   
    var editImage = document.getElementById("editImage").files[0]
     
    var formData = new FormData();
    formData.append('editPostTitleFr', editPostTitleFr) 
    formData.append('editPostDescFr', editPostDescFr) 
    formData.append('editPostTitleAr', editPostTitleAr) 
    formData.append('editPostDescAr',editPostDescAr ) 
    formData.append('id', id) 
    formData.append('actif',actif) 
    formData.append('editImage', editImage)
     
   



  

    if(editPostTitleFr && editPostDescFr && editPostTitleAr && editPostDescAr)
    {   
        if (editImage)
            {
                formData.append('imageName', editImage.name)
            }
        else
            {
                formData.append('imageName', "")
            }

            
            $.ajax({
                url: "/administration/editpost",
                type: 'POST',
                data:formData,
                processData: false, 
                contentType: false,
                success: function(data) {
                    if (data == "fff")
                        {   
                                         
                            showPosts()
                            alert("Post Edited")    

                            document.getElementById("editPostTitleFr").value = ""
                            document.getElementById("editPostDescFr").innerHTML = ""
                            document.getElementById("editPostTitleAr").value=""
                            document.getElementById("editPostDescAr").innerHTML=""
                            document.getElementById("id").value=""
                            document.getElementById('actif').value =""   
                            document.getElementById("editImage").value =""
                                                }
                    else
                    {
                        alert("Error occured")
                    }
                }
            });

            // $.post("/administration/editpost",
            //         {   id:id,
            //             editPostTitleFr: editPostTitleFr,
            //             editPostDescFr: editPostDescFr,
            //             editPostTitleAr:editPostTitleAr,
            //             editPostDescAr:editPostDescAr,
            //             editImage:editImage,
            //             actif:actif             


            //         },
            //         function(data, status){
            //             if (data == "fff")
            //             {   
            //                 alert("Post Edited")                 
            //                 showPosts()
            //             }
                        
            //         });
       
            
    }
    else
    {
        alert("All fields must be filled")
    }
}

function sendQst() {
   

        var name = document.getElementById("name").value
        var lastName = document.getElementById("lastName").value
        var email = document.getElementById("email").value
        var message = document.getElementById("message").value
      
         
    
       
        
        var formData = new FormData();
        formData.append('name', name) 
        formData.append('lastName', lastName) 
        formData.append('email', email) 
        formData.append('message', message) 
       
    
        if(name && lastName && email && message)
        {  
            $.ajax({
                url: "/administration/sendmail",
                type: 'POST',
                data:formData,
                processData: false, 
                contentType: false,
                success: function(data) {
                    if (data == "fff")
                        {   
                                    
                            
                            alert("تم استقبال إنشغالكم")        
                            
                            document.getElementById("name").value =""
                            document.getElementById("lastName").value=""
                            document.getElementById("email").value=""
                            document.getElementById("message").value=""
                          
    
    
                        }
                    else
                    {
                        alert("خطأ في الارسال")
                    }
                }
            });
          
           
                
        }
        else
        {
            alert("يجب ملأ كل الفراغات")
        }
    
    
    
    
    
    
}