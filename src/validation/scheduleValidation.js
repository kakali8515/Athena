import validator from "validator";
import { errorMsg } from "@/config/Message";
import moment from "moment";

const scheduleValidation = (data) => {
    let errors = {};

    let currentDate = new Date();
    let date = moment(String(currentDate)).format("YYYY-MM-DD");

    const getFormatedDate = (dt) => {
        const date = new Date(dt);
        return (
          date.getFullYear() +
          "-" +
          (date.getMonth() > 8
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1)) +
          "-" +
          (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
        );
      };

    const { schedule_title, schedule_details, schedule_start_date, schedule_end_date, schedule_start_time, schedule_end_time, schedule_event_type } = data;

    let newStartDate = getFormatedDate(schedule_start_date) + ' ' + schedule_start_time;
    let newEndDate = getFormatedDate(schedule_end_date) + ' ' + schedule_end_time;

    if (validator.isEmpty(schedule_title)) {
        errors.schedule_title = errorMsg.schedule_title;
    }
    else if (validator.isLength(schedule_title, { min: 20 })) {
        errors.schedule_title = errorMsg.scheduletitleLength;
    }

    if (validator.isEmpty(schedule_details)) {
        errors.schedule_details = errorMsg.schedule_details;
    }

    else if (validator.isLength(schedule_details, { min: 100 })) {
        errors.schedule_details = errorMsg.scheduleDetailLength;
    }

    if (validator.isEmpty(schedule_start_date.toString())) {
        errors.schedule_start_date = errorMsg.schedule_start_date;
    }
    else if (getFormatedDate(schedule_start_date) < date) {

        errors.schedule_start_date = errorMsg.validDate;
    }

    if(schedule_event_type==false || schedule_event_type=='time_period') {
        if (validator.isEmpty(schedule_end_date.toString())) {
            errors.schedule_end_date = errorMsg.emptyEndDate;
        }
        if (validator.isEmpty(schedule_start_time)) {
            errors.schedule_start_date = errorMsg.schedule_start_date;
        }
        if (validator.isEmpty(schedule_end_time)) {
            errors.schedule_end_date = errorMsg.emptyEndDate;
        }
        else if (getFormatedDate(schedule_end_date) < getFormatedDate(schedule_start_date)) {
            errors.schedule_end_date = errorMsg.schedule_end_date;
        }
    
        else if (newStartDate > newEndDate) {
            errors.schedule_end_date = errorMsg.schedule_end_date;
        }
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };
}

export default scheduleValidation;