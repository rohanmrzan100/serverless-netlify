import type { Handler, Context } from "@netlify/functions";
interface EventBody {
  id: string;
  auth: string;
  // You can add more properties here if needed
}
export const handler: Handler = async (event, Context) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 501,
        body: JSON.stringify({ message: "Not Implemented" }),
      };
    }
    if (!event.body) {
      return {
        statusCode: 400,
        body: "Request body is missing.",
      };
    }

    const body: EventBody = JSON.parse(event.body);
    if (!body.id || !body.auth) {
      return {
        statusCode: 422,
        body: "ID, email, and message are required.",
      };
    }
    // Set cookie
    const cookie = `authToken=${body.auth}; Secure; HttpOnly;`;
    const headers = {
      "Set-Cookie": cookie,
    };
    return {
      statusCode: 200,
      headers: headers,
      body: event.body,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
