import axios from "axios";
import { data } from "jquery";
import { ENTITY_TYPE_POST} from "constant/entityType"
const API_URL = "https://api.phamdong.com"

class PostService {

  async getListAll(fields){
    let ids =await this.getAllIDs();
    let result = await this.getByIDs(ids,fields);
    var listData = Object.values(result.data);
    return listData;
  }

  async getAllIDs() {
    let result = await axios({
      method: "get",
      url: API_URL+"/v0/posts/ids",
    }).then((data) => {
        return data.data;
    })
    .catch((error) => {
      alert(error)
    });
    return result.data;
  }

  async getByIDs(ids,fields) {
    let oids =  ids.map(id=>`${ENTITY_TYPE_POST}-${id}`);
    let result = await axios({
      method: "put",
      url: API_URL+"/v0/objects",
      data: {
        oids:oids,
        fields:fields
      },
    }).then((data) => {
        return data.data;
    });
    return result.data;
  }

  async create(title, body, image, meta, published,description) {
    // Make a Post Request
    let result = await axios({
      method: "post",
      url: API_URL+"/v0/posts",
      data: {
        title: title,
        body: body,
        meta: meta,
        image: image,
        published: published,
        description:description
      },
    }).then((data) => {
        return data.data;
    })
    .catch((error) => {
      return error;
    });
    return result;
  }

  async update(id, title, body, image, meta, published,description) {
    let result = await axios({
      method: "put",
      url: `${API_URL}/v0/posts/${id}`,
      data: {
        title: title,
        body: body,
        meta: meta,
        image: image,
        published: published,
        description:description
      },
    }).then((data) => {
        return data.data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
    return result;
  }

  async delete(id) {
      let result = await axios({
      method: "delete",
      url: `${API_URL}/v0/posts/${id}`,
    }).then((data) => {
        return data.data;
    })
    .catch((error) => {
      alert(error)
    });
    return result.data;
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new PostService();
