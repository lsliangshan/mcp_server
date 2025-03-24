import Database from "better-sqlite3";
import path from "path";

const db = new Database(
  path.resolve(import.meta.dirname, "../data/zhaopin.db"),
  {
    verbose: console.log,
  }
);

export function findProvince(name: string) {
  const stmt = db.prepare("SELECT * FROM province WHERE name LIKE ?");
  return stmt.get(`%${name}%`);
}

export function findCity(name: string) {
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

export function findCounty(name: string) {
  const stmt = db.prepare("SELECT * FROM county WHERE name LIKE ?");
  const res = stmt.get(`%${name}%`);
  if (res) {
    return {
      type: "county",
      ...res,
    };
  }
  return findSubway(name);
}

export function findAddress(province: string, city: string, district: string) {
  const stmt = db.prepare(
    "SELECT * FROM address WHERE province = ? AND city = ? AND district = ?"
  );
  return stmt.get(province, city, district);
}

export function findSubway(name: string) {
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

export function findSubwayStation(name: string) {
  const stmt = db.prepare("SELECT * FROM station WHERE name LIKE ?");
  const res = stmt.get(`%${name}%`);
  if (res) {
    return {
      type: "station",
      ...res,
    };
  }
  return null;
}
