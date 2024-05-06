import axios from 'axios';

export default class bulletinBoard {
    // bulletin board name list
    async bulletinBoardName() {
        return await axios.post(`/bulletine-board`)
            .then((res) => res)
            .catch((err) => err)
    }
    // add bulletin board name
    async addBulletinBoardName(board_name) {
        return await axios.post(`/bulletine-board/add`, { board_name: board_name })
            .then((res) => res)
            .catch((err) => err)
    }
    // bulletin board post list
    async bulletinBoardList(board_id, page, limit) {
        return await axios.post(`/bulletine-board/post-list`, { board_id: board_id, page: page, limit: limit })
            .then((res) => res)
            .catch((err) => err)
    }

    // bulletin board details
    async bulletinBoardDetails(id, reload) {
        return await axios.post(`/bulletine-board/post-view`, { id: id, is_page_reload: reload })
            .then((res) => res)
            .catch((err) => err)
    }

    // add comment
    async addComment(post_id, comment) {
        return await axios.post(`/bulletine-board/comment-add`, { post_id: post_id, comment: comment })
            .then((res) => res)
            .catch((err) => err)
    }

    // get user list
    async getUserList(board_id, search_text) {
        return await axios.post(`/bulletine-board/user-list`, { board_id: board_id, search_text: search_text })
            .then((res) => res)
            .catch((err) => err)
    }

    // add user
    async addUser(board_id, user_id) {
        return await axios.post(`/bulletine-board/add-user`, { board_id: board_id, user_id: user_id })
            .then((res) => res)
            .catch((err) => err)
    }

    // correction
    async userPermission(data, bId) {
        return await axios.post(`/bulletine-board/user-access`, { userAccess: data, board_id: bId })
            .then((res) => res)
            .catch((err) => err)
    }

    // board user list
    async boardUserList(board_id) {
        return await axios.post(`/bulletine-board/board-user-list`, { board_id: board_id})
            .then((res) => res)
            .catch((err) => err)
    }
    // download posted image
    async downloadPostedImage(board_id, board_post_id) {
        return await axios.post(`/bulletine-board/download-image`, { board_id: board_id, board_post_id: board_post_id })
            .then((res) => res)
            .catch((err) => err)
    }
}
