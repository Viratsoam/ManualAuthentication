const User = require('../models/user');

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        // finding the user id
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title: "User Profile",
                    user: user
                });
            }
            return res.redirect('/user/sign-in');
        });

    }else{
        return res.redirect('/user/sign-in');
    }
}


// render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    });
}

// get the sign Up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("error in finding the user in Singing Up!!");
            return;
        }
        if(!user){
            User.create(req.body,function(err){
                if(err){
                    console.log("error in creating user while sign Up!!");
                    return;
                }
                
                return res.redirect('/user/sign-in');
            });
        }else{
            return res.redirect('back');
        }

    });
    

}

// create session / it for manual Authantication
module.exports.createSession = function(req,res){
    // find the user
    User.findOne({email: req.body.email},function(err,user){
            if(err){
                console.log("Error in finding the user: ",err);
            }
            // handle user found
            if(user){
                // handle user password doesn't match
                    if(user.password != req.body.password){
                        console.log("Please enter correct password!!");
                        return res.redirect('back');
                    }
                // handle session creation
                    res.cookie('user_id',user.id);
                    return res.redirect('/user/profile');
            }else{
                // handle user not found
                console.log("User not found!!");

                return res.redirect('back');
            }
    });
}