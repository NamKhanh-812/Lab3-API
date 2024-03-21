const express = require('express');
const router = express.Router();

const Distributors = require('../models/distributors')
const Fruits = require('../models/fruits')
const Users = require('../models/users')

router.get('/distributors', async (req, res) => {
    const distributors = await Distributors.find()
    console.log(distributors);
    res.send(distributors)
})

router.get('/fruits', async (req, res) => {
    const fruits = await Fruits.find()
    console.log(fruits);
    res.send(fruits)
})

router.get('/fruits/:id', async (req, res) => {
    try {
    const { id } = req.params // lấy id
    const fruit = await Fruits.findById(id).populate('id_distributor')
    console.log(fruit)
    res.json({
        "status":200,
        "messenger":"Danh sách fruit",
        "data": fruit
    })
    } catch (error) {
        console.log(error);
    }
})

router.get('/fruits_in_price', async (req, res) => {
    const { price_start, price_end } = req.query // lay du lieu thong qua id tren url goi la param

    const query = { price: { $gte: price_start, $lte: price_end } };
    // $gte : lon hon hoac bang, $ge : lon hon
    // $lte : nho hon hoac bang, $le : nho hon

    const fruit = await Fruits.find(query, 'name price')
        .populate('id_distributor')
        .sort({ quantity: -1 }) // giam dan : -1 , tang dan : 1 
        .skip(0) // bo qua so luong row
        .limit(2)  // lay 2 san pham
    console.log(fruit);
    res.send(fruit);
});

router.get('/users', async (req, res) => {
    const users = await Users.find();
    console.log(users);
    res.send(users);
});

router.post('/add_distributor', async (req, res) => {
    try {
        const data = req.body; // lay du lieu tu body
        const newDistributors = new Distributors({
            name: data.name
        }); // tao mot doi tuong moi

        const result = await newDistributors.save(); // them vao database
        if (result) {
            // neu them thanh cong result !null thi tra ve du lieu
            res.json({
                "status": 200,
                "messenger": "Them thanh cong",
                "data": result
            })
        } else {
            // neu them khong thanh cong result == null thi tra ve du lieu rong []
            res.json({
                "status": 400,
                "messenger": "Them khong thanh cong",
                "data": []
            })
        }
    } catch (err) {
        console.log(err);
    }
});

// them fruit
router.post('/add_fruit', async (req, res) => {
    try {
        const data = req.body; // lay du lieu
        const newFruit = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: data.image,
            description: data.description,
            id_distributor: data.id_distributor
        })
        const result = await newFruit.save(); // them vao database
        if (result) {
            // neu them thanh cong result !null thi tra ve du lieu
            res.json({
                "status": 200,
                "messenger": "Them thanh cong",
                "data": result
            })
        } else {
            // neu them khong thanh cong result == null thi tra ve du lieu rong []
            res.json({
                "status": 400,
                "messenger": "Them khong thanh cong",
                "data": []
            })
        }
    } catch (err) {
        console.log(err);
    }
})


// update fruit

router.put('/fruits/update/:id', async (req, res) => {
    const { id } = req.params
    const data = req.body;
    const updateFruit = await Fruits.findById(id);
    let result = null;
    if (updateFruit) {
        // tao 1 doi tuong moi va them vao database
        updateFruit.name = data.name ?? updateFruit.name;
        updateFruit.quantity = data.quantity ?? updateFruit.quantity;
        updateFruit.price = data.price ?? updateFruit.price;
        updateFruit.image = data.image ?? updateFruit.image;
        updateFruit.description = data.description ?? updateFruit.description;
        updateFruit.status = data.status ?? updateFruit.status;
        updateFruit.id_distributor = data.id_distributor ?? updateFruit.id_distributor;
        result = await updateFruit.save();
    }

    if (result) {
        // neu them thanh cong result !null thi tra ve du lieu
        res.json({
            "status": 200,
            "messenger": "Cap nhat thanh cong",
            "data": result
        })
    } else {
        // neu them khong thanh cong result == null thi tra ve du lieu rong []
        res.json({
            "status": 400,
            "messenger": "Cap nhat khong thanh cong",
            "data": []
        })
    }
})


// xoa fruit

router.delete('/fruits/delete/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Fruits.deleteOne({ _id: id });
    console.log(result);
    res.redirect('../');
}) 

module.exports = router;
