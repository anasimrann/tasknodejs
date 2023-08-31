const fs = require("fs");
const path = require('path');
const bcrypt = require('bcrypt');

class Users {
    getJSONdata() {
        return new Promise((resolve, reject) => {
            const filePath = path.join(__dirname, '../Model/data.json');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    getAllUsers = (req, res, next) => {
        try {
            this.getJSONdata().then((data) => {
                const userData = JSON.parse(data);
                return res.status(200).json(userData);
            }).catch(err => {
                return res.status(500).json({ message: err })
            })
        }
        catch (err) {
            return res.status(500).json({ message: "something went wrong" });
        }
    }

    findById = (req, res, next) => {
        try {
            const id = Number(req.params.id)
            this.getJSONdata().then((data) => {
                const userData = JSON.parse(data);
                const foundUser = userData.find(user => {
                    return user.id === id;
                })
                if (foundUser) {
                    return res.status(200).json(foundUser);
                }
                else {
                    return res.status(404).json({ message: "User not found" });
                }
            }).catch(err => {
                return res.status(500).json({ message: err })
            })
        }
        catch (err) {
            return res.status(500).json({ message: "something went wrong" })
        }
    }

    addUser = async (req, res, next) => {
        try {
            const obj = req.body;
            const password = await bcrypt.hash(obj.password, 10);
            this.getJSONdata().then((data) => {
                const userData = JSON.parse(data);
                const lastIndex = userData.length;
                const id = lastIndex > 0 ? userData[lastIndex - 1].id + 1 : 1;
                const newObj = {
                    id,
                    ...obj,
                    password
                }
                userData.push(newObj);
                const filePath = path.join(__dirname, '../Model/data.json');
                fs.writeFile(filePath, JSON.stringify(userData), 'utf8', (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err)
                    } else {
                        console.log("Data Appended Successfully")
                        return res.status(201).json(newObj)
                    }
                });
            }).catch(err => {
                return res.status(500).json({ message: err })
            })
        } catch (err) {
            return res.status(500).json({ message: "something went wrong" })
        }
    }

    updateUser = async (req, res, next) => {

        try {
            var flag = 0;
            const id = Number(req.params.id);
            const Obj = req.body;
            console.log(Obj);
            const password = await bcrypt.hash(Obj.password, 10);
            const updateObj = { ...Obj, password }
            this.getJSONdata().then(data => {
                const userData = JSON.parse(data);
                const updatedUsers = userData.map(user => {
                    if (user.id === id) {
                        flag = 1;
                        return { ...user, ...updateObj }
                    }
                    return user;
                });
                if (flag) {
                    const filePath = path.join(__dirname, '../Model/data.json');
                    fs.writeFile(filePath, JSON.stringify(updatedUsers), 'utf8', (err) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err)
                        } else {
                            console.log("Data Updated Successfully")
                            return res.status(200).json(updateObj)
                        }
                    });
                }
                else {
                    return res.status(400).json({ message: "Bad id" })
                }
            }).catch(err => {
                return res.status(500).json({ message: err })
            });
        }
        catch (err) {
            return res.status(500).json({ message: "something went wrong" })
        }
    }

    deleteUser = (req, res, next) => {

        try {
           
            const id = Number(req.params.id);
            console.log(id);
            this.getJSONdata().then(data => {

                const userData = JSON.parse(data);
                const findUser = userData.find((user) => {
                   return user.id === id;

                });

                if (findUser) {

                    const updateData = userData.filter(user => {
                        return user.id !== id
                    });
                    const filePath = path.join(__dirname, '../Model/data.json');
                    fs.writeFile(filePath, JSON.stringify(updateData), 'utf8', (err) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err)
                        } else {
                            console.log("Data Deleted")
                            return res.status(204).json({ message: "User deleted successfully" })
                        }
                    });
                }else{
                    return res.status(404).json({message:"user not found"});
                }
            });
        }
        catch (err) {
            return res.status(500).json({ message: "something went wrong" })
        }
    }
}
module.exports = Users