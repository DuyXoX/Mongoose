const express = require('express');
const userModel = require('../model/user');
const productModel = require('../model/products');
const app = express();
app.use(express.static('Images'));

app.get('/', (req, res) => {
    res.render('users/login.hbs', {
        viewTitle: "Login User"
    });
});

app.get('/addUser', (req, res) => {
    res.render('users/addAndEdit.hbs');
});

app.get('/products', (req, res) => {
    userModel.find({}).then(users => {
        res.render('layouts/index.hbs', {
            users: users.map(user => user.toJSON())
        });
    })
});
//add data
app.post('/add', async (req, res) => {
    console.log(req.body);
    const viewTitle = req.body.viewTitle;
    if (req.body.id == '') {
        addUser(req, res, viewTitle);
    } else {
        update(req, res, viewTitle);
    }
});

function addUser(req, res, viewTitle) {
    const u = new userModel(req.body);
    try {
        u.save();
        res.render('users/addAndEdit.hbs', {
            viewTitle: viewTitle
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function update(req, res, viewTitle) {
    try {
        const doc = await userModel.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });
        res.redirect('/user/list');
    } catch (err) {
        console.error(err);
        res.render('users/addAndEdit.hbs', {
            viewTitle: viewTitle
        });
    }
}

app.get('/list', (req, res) => {
    userModel.find({}).then(users => {
        res.render('users/view-user.hbs', {
            users: users.map(user => user.toJSON())
        });
        console.log("User" + users);
    })

});

app.get('/login', (req, res) => {
    userModel.find({}).then(users => {
        res.render('users/home.hbs', {
            viewTitle: 'Login Form',
        });
    })

});

// app.get('/listst', async(req, res) =>{
//     const users = await userModel.find({})
//     try {
//         console.log("User" + users);
//         res.send(users);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })

app.get('/loginHandle', (req, res) => {
    const lemail = req.query.lemail;
    const lpassword = req.query.lpassword;
    console.log(lemail);
    try {
        userModel.findOne({ email: lemail, password: lpassword }).then(user => {
            if (user) {
                res.render('users/home.hbs', {
                    viewTitle: "Information User"
                });
                console.log('ok')

            } else {
                res.render('users/login');
            }

        });
    } catch (error) {
        res.status(500).send(error);
    }

});
//edit
// app.get('/edit/:id', (req, res) => {
//     userModel.findById(req.params.id, (err, user) => {
//         if(!err){
//             res.render('users/addAndEdit.hbs', {
//                 user: user.toJSON()
//             });
//         }
//     });
// });
//Phiên bản mới của Mongoose không còn hỗ trợ việc truy vấn bằng callback trong phương thức .findById()

app.get('/edit/:id', (req, res) => {
    userModel.findById(req.params.id)
        .then(user => {
            res.render('users/addAndEdit.hbs', {
                user: user.toJSON(),
                viewTitle: 'Update Information'
            });
        })
        .catch(err => {
            console.error(err);
            res.redirect('/');
        });
});

app.get('/del/:id', async (req, res) => {
    try {
        const product = await userModel.findByIdAndDelete(req.params.id, req.body);
        if (!user) res.status(404).send("No item found");
        else {
            res.redirect('/user/list')
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = app;