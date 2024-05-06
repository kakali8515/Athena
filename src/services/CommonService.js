import axios from "axios";

export default class CommonService {
  // get date
  async companyReviewDate(company_id) {
    return await axios
      .post(`/company/user-company-review-date`, { company_id: company_id })
      .then((res) => res)
      .catch((err) => err);
  }

  // get company list
  async companyName() {
    return await axios
      .post(`/company/user-company-list`)
      .then((res) => res)
      .catch((err) => err);
  }

  // get certification list
  async certificationName(company_id) {
    return await axios
      .post(`/company/user-company-certification-list`, {
        company_id: company_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // company user list
  async userList(companyId, userSearch) {
    return await axios
      .post(`/chat/get-company-user-list`, {
        company_id: companyId,
        searchText: userSearch,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // get chat history
  async chatHistory(roomId, page, chatLimit) {
    return await axios
      .post(`/chat/get-chat-history`, {
        room_id: roomId,
        page: page,
        limit: chatLimit,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // get latest chat room
  async chatRoom(roomLimit) {
    return await axios
      .post(`/chat/get-user-latest-chatrooms`, { limit: roomLimit })
      .then((res) => res)
      .catch((err) => err);
  }
  // get all chat room
  async allChatRoom(msgSearch) {
    return await axios
      .post(`/chat/get-user-all-chatrooms`, { searchText: msgSearch })
      .then((res) => res)
      .catch((err) => err);
  }
  async createRoom(friendId) {
    return await axios
      .post(`/chat/create-room`, { friend_id: friendId })
      .then((res) => res)
      .catch((err) => err);
  }
  // mark all read
  async readChat(room_ids) {
    return await axios
      .post(`/chat/mark-all-read`, { room_ids: room_ids })
      .then((res) => res)
      .catch((err) => err);
  }
  // delete msg
  async deleteMsg(conversation_id, roomId) {
    return await axios
      .post(`/chat/delete-message`, {
        conversation_id: conversation_id,
        room_id: roomId,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // read all msg
  async readAllChat() {
    return await axios
      .post(`/chat/mark-all-read`)
      .then((res) => res)
      .catch((err) => err);
  }

  async ecePayment(page, limit, type, certification) {
    return await axios
      .post(`/electronic-payment`, {
        page: page,
        limit: limit,
        type: type,
        certification: certification,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async paymentDetails(evidence_id, transaction_id) {
    return await axios
      .post(`/electronic-payment/evidence/view-details`, {
        evidence_id: evidence_id,
        transaction_id: transaction_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // evidence-reject
  async evidenceReject(evidence_id, transaction_id, reject_reason) {
    return await axios
      .post(`/electronic-payment/evidence/evidence-reject`, {
        evidence_id: evidence_id,
        transaction_id: transaction_id,
        reject_reason: reject_reason,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // evidence-approve
  async evidenceApprove(evidence_id, transaction_id) {
    return await axios
      .post(`/electronic-payment/evidence/evidence-approve`, {
        evidence_id: evidence_id,
        transaction_id: transaction_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // evidence-download
  async downloadEvidence(evidence_id, transaction_id) {
    return await axios
      .post(`/electronic-payment/evidence-download`, {
        evidence_id: evidence_id,
        transaction_id: transaction_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // notification

  // get notificaion
  async notification(page, limit) {
    return await axios
      .post(`/notification/get-notification`, {
        page: page,
        limit: limit,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  // read all notification
  async readAll(){
    return await axios
    .post(`/notification/notification-readAll`)
    .then((res) => res)
    .catch((err) => err);
  }
  // delete notification
  async deleteNotification(notificationId) {
    return await axios
      .post(`/notification/delete-notification`, {
        id: notificationId
      })
      .then((res) => res)
      .catch((err) => err);
  }

  
  // change company
  async changeCompnay(company_id) {
    return await axios
      .post(`/company/user-company-change`, {
        company_id: company_id,
      })
      .then((res) => res)
      .catch((err) => err);
  }
}
