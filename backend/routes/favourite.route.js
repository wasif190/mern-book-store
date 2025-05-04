const router = require("express").Router();
const User = require("../models/user.model");
const {authenticateToken} = require("./userAuth");

// add book to favourite
router.put("/add-book-to-favourite", authenticateToken, async(req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const isBookFav = userData.favourites.includes(bookid);

        if (isBookFav) {
            return res.status(200).json({ message: "Book is already in fav list" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { favourites: bookid } },
            { new: true, runValidators: true }
        );

        console.log("Updated User:", updatedUser);

        return res.status(200).json({ message: "Book added to fav", favourites: updatedUser.favourites });
    } catch (error) {
        console.log("Getting error while adding fav book", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


// remove from fav list
router.delete("/remove-book-from-favourite", authenticateToken, async(req, res) => {
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id, {$pull: {favourites: bookid}});
        }

        return res.status(200).json({message: "Book removed from fav"})
    } catch (error) {
        console.log("Getting error while adding fav book", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// get fav books of a particular user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;

        return res.json({
            status: "Success",
            data: favouriteBooks
        })

    } catch (error) {
        console.log("Getting error while adding fav book", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
})



module.exports = router

