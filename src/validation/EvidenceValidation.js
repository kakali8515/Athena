import validator from "validator";

const EvidenceValidate = (data) => {
  let errors = {};
  const {
    certification_name,
    control_area,
    evidence_code,
    evidence,
    due_diligence,
    cycle,
    template_id,
    manager_list,
    user_list,
    control_items,
    explanation
  } = data;

  if (validator.isEmpty(certification_name)) {
    errors.alertMessage = "certification_name is required";
  }
  if (validator.isEmpty(control_area)) {
    errors.alertMessage = "control_area is required";
  }
  if (validator.isEmpty(evidence_code)) {
    errors.alertMessage = "evidence_code is required";
  }
  if (validator.isEmpty(evidence)) {
    errors.alertMessage = "evidence is required";
  }
  if (validator.isEmpty(due_diligence)) {
    errors.alertMessage = "due_diligence is required";
  }
  if (validator.isEmpty(cycle)) {
    errors.alertMessage = "cycle is required";
  }
  if (validator.isEmpty(template_id)) {
    errors.alertMessage = "template_id is required";
  }
  if (validator.isEmpty(manager_list)) {
    errors.alertMessage = "manager_list is required";
  }
  if (validator.isEmpty(user_list)) {
    errors.alertMessage = "user_list is required";
  }
  if (validator.isEmpty(control_items)) {
    errors.alertMessage = "user_list is required";
  }
  if (validator.isEmpty(explanation)) {
    errors.alertMessage = "user_list is required";
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors,
  };
};

export default EvidenceValidate;
