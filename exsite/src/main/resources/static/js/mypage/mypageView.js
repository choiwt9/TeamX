window.onload=()=>{

    const userId = "${loginUser.userId}";
    const userName = "${loginUser.userName}";
    const userEmail = "${loginUser.userEmail}";

    $("#passwordChange").click(()=>{
        $.ajax({
            url:'/dsfsdf',
            type: 'post',
            data: {
                userId:'userId',
                userName:'userName',
                userEmail: 'userEmail'
            },
            success:(result) =>{
                $("input[name='userId']").val(result);
            }

        })

        
    })
}