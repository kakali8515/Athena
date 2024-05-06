import axios from 'axios';

export default class ScheduleManagementService {
    // add event
     async addEvent(event_data) {
        return await axios.post(`/event/add`, {...event_data})
            .then((res) => res)
            .catch((err) => err)
    }

    async editEvent(event_data) {
        return await axios.post(`/event/edit`, {...event_data})
            .then((res) => res)
            .catch((err) => err)
    }

    async scheduleList(schedule_type) {
        return await axios.post(`/event/present-event-list`, { schedule_type: schedule_type })
            .then((res) => res)
            .catch((err) => err)
    }

    async scheduleDetails(id) {
        return await axios.post(`/event/view-details`, { id: id })
            .then((res) => res)
            .catch((err) => err)
    }

    async userList(search_text,selected_user_id) {
        return await axios.post(`/event/user-list`, { search_text: search_text, selected_user_id,selected_user_id })
            .then((res) => res)
            .catch((err) => err)
    }
}
