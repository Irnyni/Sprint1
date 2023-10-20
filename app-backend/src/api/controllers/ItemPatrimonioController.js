module.exports = {
    
    listAll: function (req, res) {
        PostService.getAllPosts().then(
            posts => {
                res.status(200).json(posts);
            }).catch(error => {
                console.error(error);
                res.status(500).send(error.message);
            });
    },

    add: function (req, res) {
        PostService.addNewPost(req.body).then((posts) => {
            res.status(201).json(posts);
        }).catch(error => {
            console.error(error);
            res.status(500).send(error.message);
        });
    },

    get: function (req, res) {
        const postId = req.params.postagemId;
        PostService.getPostById(postId).then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ status: `Não foi possível encontrar o post para ${postId}.` });
            }
        });
    },

    remove: function (req, res) {
        const postId = req.params.post_id;
        PostService.removePostById(postId).then((status) => {
            res.status(200).json(status);
        });
    }
}
