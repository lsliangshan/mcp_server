import Database from "better-sqlite3";
import path from "path";
const db = new Database(path.resolve(import.meta.dirname, "../data/zhaopin.db"), {
    verbose: console.log,
});
export function findProvince(name) {
    const stmt = db.prepare("SELECT * FROM province WHERE name LIKE ?");
    return stmt.get(`%${name}%`);
}
export function findCity(name) {
    const stmt = db.prepare("SELECT * FROM city WHERE name LIKE ?");
    const res = stmt.get(`%${name}%`);
    if (res) {
        return {
            type: "city",
            ...res,
        };
    }
    return findCounty(name);
}
export function findCounty(name, cityName) {
    const stmt = db.prepare(`SELECT * FROM county WHERE name LIKE ?${cityName ? "AND cityName LIKE ?" : ""}`);
    const res = stmt.get(`%${name}%`, cityName ? `%${cityName}%` : "");
    console.log(">>>>>>>>>>res", res);
    if (res) {
        return {
            type: "county",
            ...res,
        };
    }
    return findSubway(name);
}
export function findAddress(province, city, district) {
    const stmt = db.prepare("SELECT * FROM address WHERE province = ? AND city = ? AND district = ?");
    return stmt.get(province, city, district);
}
export function findSubway(name) {
    const stmt = db.prepare("SELECT * FROM subway WHERE name LIKE ?");
    const res = stmt.get(`%${name}%`);
    if (res) {
        return {
            type: "subway",
            ...res,
        };
    }
    return findSubwayStation(name);
}
export function findSubwayStation(name, subwayName) {
    const stmt = db.prepare(`SELECT * FROM station WHERE name LIKE ? ${subwayName ? "AND parentName LIKE ?" : ""}`);
    const res = stmt.get(`%${name}%`, subwayName ? `%${subwayName}%` : "");
    if (res) {
        return {
            type: "station",
            ...res,
        };
    }
    return null;
}
