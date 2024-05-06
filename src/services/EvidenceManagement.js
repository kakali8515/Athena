import axios from "axios";

export default class EvidenceManagement {
  async getEvidenceListPreset(data) {
    try {
      return axios.post("evidence/preset", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async getEvidenceList(data) {
    try {
      return axios.post("evidence", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async viewEvidence(data) {
    try {
      return axios.post("/evidence/view", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async dueDilligence() {
    try {
      return axios.post("evidence/list-of-due-diligence");
    } catch (error) {
      return console.log(error.response);
    }
  }
  async cyclelist() {
    try {
      return axios.post("evidence/list-of-cycle");
    } catch (error) {
      return console.log(error.response);
    }
  }
  async controlAreaList(data) {
    try {
      return axios.post("evidence/list-of-class", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async ListOfItems(data) {
    try {
      return axios.post("evidence/list-of-item-number", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async templateList(data) {
    try {
      return axios.post("evidence/template-list", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async managersList(data) {
    try {
      return axios.post("evidence/list-of-manager", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async approveEvidence(data) {
    try {
      return axios.post("evidence/approve", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async addEvidence(data) {
    try {
      return axios.post("evidence/add", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async editEvidence(data) {
    try {
      return axios.post("evidence/edit", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async evidenceGroupList() {
    try {
      return axios.post("evidence/group-list");
    } catch (error) {
      return console.log(error.response);
    }
  }
  async SaveEvidenceGroup(data) {
    try {
      return axios.post("evidence/group/mapping", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async addEvidenceGroup(data) {
    try {
      return axios.post("evidence/group/add", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async EvidenceGroupEntireEvidence(data) {
    try {
      return axios.post("evidence/list-of-evidence", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async EvidenceAssigneGroup(data) {
    try {
      return axios.post("evidence/list-of-assign-evidence", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async EvidenceDeleteGroup(data) {
    try {
      return axios.post("evidence/delete-group", data);
    } catch (error) {
      return console.log(error.response);
    }
  }

  async OperatingStatement(data) {
    try {
      return axios.post("evidence/operating-statement-list", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async EditTemplate(data) {
    try {
      return axios.post("evidence/template/edit", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async OperatingStatementSave(data) {
    try {
      return axios.post("evidence/operating-statement/save", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async deleteHistoryList(data) {
    try {
      return axios.post("evidence/delete-history-list", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async downloadEvidenceById(data) {
    try {
      return axios.post("evidence/download", data);
    } catch (error) {
      return console.log(error.response);
    }
  }
  async deleteEvidenceById(data) {
    try {
      return axios.post("evidence/delete", data);
    } catch (error) {
      return console.log(error.response);
    }
  }


  // record evidence or related documents
  async recordEvidence(item_number, certification, documents) {
    return await axios
      .post("/evidence/operating-statement/related-documents", {
        item_number: item_number,
        certification: certification,
        documents: documents
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // enactment revision history list
  async revisionHistoryList(_page, _limit) {
    return await axios.post('/evidence/enactment-revision-history-list', { page: _page, limit: _limit }).then((res) => res).catch((err) => err);
  }

  // enactment revision history save
  async revisionHistorySave(credentials) {
    return await axios.post('/evidence/enactment-revision-history-save', { data: credentials }).then((res) => res).catch((err) => err);
  }

  // full trace download
  async fullTraceDownload(certification) {
    return await axios.post('/evidence/download-full-trace', { searchByCertification: certification }).then((res) => res).catch((err) => err);
  }

  // upload history
  async evidenceDetailUploadHistory(id) {
    return await axios.post('/evidence/upload-history', { evidence_id: id }).then((res) => res).catch((err) => err);
  }

  //operating statement download
  async operatingStatementDownload(data) {
    return await axios.post('/evidence/operating-statement-list/download', data).then((res) => res).catch((err) => err);
  }

  // calling up diagnostic result
  async callingUpResult(data) {
    return await axios.post('/evidence/operating-statement-list/calling-diagnostic-result', data).then((res) => res).catch((err) => err);
  }

  // convert document to pdf
  async convertPdf(evidence_id, file_path) {
    return await axios.post('/download/covert-pdf', { evidence_id: evidence_id, file_path: file_path }).then((res) => res).catch((err) => err);
  }



}



// const errorCheck = (er) => {
//     if (er.response.status === 400) return er.response;
//     else if (er.response.status === 403) {
//         localStorage.removeItem('user');
//         window.location.href = '/login';
//     } else console.log(er.response);
// };
