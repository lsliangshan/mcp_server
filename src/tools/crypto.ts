import crypto from "crypto";

export function hmacSha256(params: { data: string; key: string }) {
  return crypto
    .createHmac("sha256", params.key)
    .update(params.data)
    .digest("base64");
}

export function encode(params: {
  data: string;
  outputFormat?: "hex" | "base64" | "utf8";
}) {
  return Buffer.from(params.data).toString(
    params.outputFormat === "hex"
      ? "hex"
      : params.outputFormat === "base64"
      ? "base64"
      : "utf8"
  );
}

export function decode(params: {
  data: string;
  inputFormat?: "hex" | "base64" | "utf8";
}) {
  return Buffer.from(
    params.data,
    params.inputFormat === "hex"
      ? "hex"
      : params.inputFormat === "base64"
      ? "base64"
      : "utf8"
  ).toString();
}
