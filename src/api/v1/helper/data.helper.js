const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTConfig = require("../config/jwt.config");

class DataHelper {
  static GenStringNumber(length) {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  static HashString(value) {
    return bcrypt.hashSync(value, 8);
  }
  static CompareStrHash(str, hashString) {
    return bcrypt.compareSync(str, hashString);
  }
  static genToken(id) {
    const token = jwt.sign({ id: id }, JWTConfig.secret, JWTConfig.options);
    return token;
  }
  static sortArrByField(array, field, order) {
    if (order === "asc") {
      return array.sort((a, b) => a[field] - b[field]);
    } else if (order === "desc") {
      return array.sort((a, b) => b[field] - a[field]);
    } else {
      throw new Error("Lỗi hàm sắp xếp mảng trong data.helper.js");
    }
  }
  static joinArrs(arr1, arr2, field) {
    const map = new Map();
    for (const item of arr2) {
      const key = item[field];
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(item);
    }

    for (const item of arr1) {
      const key = item[field];
      if (map.has(key)) {
        item[field + "_joined"] = map.get(key);
      }
    }

    return arr1;
  }
}

module.exports = DataHelper;
