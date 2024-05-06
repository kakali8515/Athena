import axios from 'axios';


export default class PolicyManagementService {

    // add policy group
    async addPolicyGroup(group_name) {
        return await axios.post(`/information-protection-policy/add-group`, { group_name: group_name })
            .then((res) => res)
            .catch((err) => err)
    }

    // policy group list
    async policyGroupList() {
        return await axios.post(`/information-protection-policy/group-list`)
            .then((res) => res)
            .catch((err) => err)
    }

    // delete policy group
    async deletePolicyGroup(id) {
        return await axios.post(`/information-protection-policy/delete-group`, { id: id })
            .then((res) => res)
            .catch((err) => err)
    }

    //  policy evidence list
    async policyEvidenceList(certification, group_id) {
        return await axios.post(`/information-protection-policy/evidence-list`, { certification: certification, group_id: group_id })
            .then((res) => res)
            .catch((err) => err)
    }

    //  group-policy-list
    async groupPolicyList(certification, group_id) {
        return await axios.post(`/information-protection-policy/group-policy-list`, { certification: certification, group_id: group_id })
            .then((res) => res)
            .catch((err) => err)
    }

    //  policy assign in group
    async assignGroup(group_id, policy_ids) {
        return await axios.post(`/information-protection-policy/evidence/assignee-in-group`, { group_id: group_id, policy_ids: policy_ids })
            .then((res) => res)
            .catch((err) => err)
    }

    // information protection policy list
    async infoProtectionPolicy(certification) {
        return await axios.post(`/information-protection-policy`, { certification: certification })
            .then((res) => res)
            .catch((err) => err)
    }

    // evidence details
    async evidenceDetails(evidence_id, history_id) {
        return await axios.post(`/information-protection-policy/evidence/view-details`, { evidence_id: evidence_id, history_id: history_id })
            .then((res) => res)
            .catch((err) => err)
    }

    // upload history list
    async uploadHistoryList(evidence_id) {
        return await axios.post(`/information-protection-policy/evidence/upload-history`, { evidence_id: evidence_id })
            .then((res) => res)
            .catch((err) => err)
    }


}