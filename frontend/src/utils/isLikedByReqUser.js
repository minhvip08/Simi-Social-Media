export const isLikedByReqUser = (reqUserID, post) => {
    console.log("reqUserID", reqUserID);
    console.log("post", post);
    for (let user of post.liked) {
        if (user.id === reqUserID) {
            return true;
        }
    }
    return false;
}