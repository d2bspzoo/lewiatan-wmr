const dev = process.env.NODE_ENV !== "production";

export const accessToken = "...";
export const siteId = "b0ad9158-283e-4519-8848-ee48c97382b1";
//export const apiUrl = "https://localhost:44321/";
//export const apiUrl2 = 'https://localhost:44349/';
//export const apiUrl = "https://api.bluebirdcms.net/";
//export const apiUrl2 = "https://regionylewiatan-api.bluebirdcms.net/";

export const apiUrl2 = dev ? "https://localhost:44349/" : "https://regionylewiatan-api.bluebirdcms.net/";
export const apiUrl = dev ? "https://localhost:44321/" : "https://api.bluebirdcms.net/";
