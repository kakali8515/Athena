import axios from 'axios';

export default class NetworkDiagramService {
    //upload Image
    async uploadImage(upload_data) {
        return await axios.post(`/assets-network-diagram/save`, upload_data)
            .then((res) => res)
            .catch((err) => err)
    }

    async networkDiagramDetails(certification) {
        return await axios.post(`assets-network-diagram/list`, { certification: certification })
            .then((res) => res)
            .catch((err) => err)
    }

    async deleteNetworkDiagram(id) {
        return await axios.post(`assets-network-diagram/delete`, { network_diagram_id: id })
            .then((res) => res)
            .catch((err) => err)
    }

}
