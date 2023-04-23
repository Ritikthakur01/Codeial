{
    // method to submit the form data for new post using ajax
    let createPost=function(){
        let newForm=$('#new_form_post');
        newForm.submit(function(e){
            e.preventDefault();
            
            $.ajax({
                type:'post',
                url:'/post/create',
                data:newForm.serialize(),
                success:function(data){
                    let newPost=newPostDOM(data.data.post)
                    $('#user-posts>ul').prepend(newPost)
                    deletePost($(' .delete_post_buuton', newPost))
                },
                error:function(err){
                    console.log(err.responseText)
                }
            })
        })
    }
    createPost()
    // method to create a post in dom
    let newPostDOM=function(post){
        return $(`<li id="post_${post._id}" >
                    <p>
                            <div>
                                <small><a class="delete_post_buuton" href="/post/destroy?id=${post._id}">X</a></small>
                            </div>
                            ${post.content}
                            <br>
                            <small>${post.user.name}</small>
                            <br>
                            <div class="post-comments">
                                <form action="/comment/create" method="post">
                                    <input type="text" name="comment" placeholder="Add comments">
                                    <input type="hidden" name="post" value="${post._id}">
                                    <button class="comment-button" type="submit">Add comment</button>
                                </form>
                        </div>
                            
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                            
                            </ul>
                        </div>
                    </p>
                </li>`)
            }

    // function to delete a post in dom using ajax

    var deletePost=function(clickLink){
        $(clickLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(clickLink).prop('href'),
                success:function(data){
                    $(`#post_${data.data.post_id}`).remove()
                },
                error:function(err){    
                    console.log(err.responseText)
                }
            })
        })
    }
}
