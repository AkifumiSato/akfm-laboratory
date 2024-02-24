import { http, HttpHandler, HttpResponse } from "msw";
import { coreApiUrl } from "../lib/api/url";

export const coreApiHandlers = {
  register: {
    success(): HttpHandler {
      return http.post(`${coreApiUrl}/auth/register`, () => {
        return new HttpResponse("null");
      });
    },
    error(): HttpHandler {
      return http.post(`${coreApiUrl}/auth/register`, () => {
        return new HttpResponse("null", { status: 500 });
      });
    },
    conflict(): HttpHandler {
      return http.post(`${coreApiUrl}/auth/register`, () => {
        return new HttpResponse("null", { status: 409 });
      });
    },
    github: {
      success(): HttpHandler {
        return http.post(`${coreApiUrl}/auth/register/github`, () => {
          return new HttpResponse("null");
        });
      },
      error(): HttpHandler {
        return http.post(`${coreApiUrl}/auth/register/github`, () => {
          return new HttpResponse("null", { status: 500 });
        });
      },
    },
  },
  login: {
    success(): HttpHandler {
      return http.post(`${coreApiUrl}/auth/login`, () => {
        return HttpResponse.json({
          token: "DUMMY TOKEN",
        });
      });
    },
    error(): HttpHandler {
      return http.post(`${coreApiUrl}/auth/login`, () => {
        return new HttpResponse("null", { status: 500 });
      });
    },
    github: {
      success(): HttpHandler {
        return http.post(`${coreApiUrl}/auth/login/github`, () => {
          return HttpResponse.json({
            token: "DUMMY TOKEN",
          });
        });
      },
      error(): HttpHandler {
        return http.post(`${coreApiUrl}/auth/login/github`, () => {
          return new HttpResponse("null", { status: 500 });
        });
      },
    },
  },
  forgot: {
    success(): HttpHandler {
      return http.post(`${coreApiUrl}/auth/forgot`, () => {
        return new HttpResponse("null");
      });
    },
    error(): HttpHandler {
      return http.post(`${coreApiUrl}/auth/forgot`, () => {
        return new HttpResponse("null", { status: 500 });
      });
    },
  },
  reset: {
    success(): HttpHandler {
      return http.post(`${coreApiUrl}/auth/reset`, () => {
        return new HttpResponse("null");
      });
    },
    error(): HttpHandler {
      return http.post(`${coreApiUrl}/auth/reset`, () => {
        return new HttpResponse("null", { status: 500 });
      });
    },
  },
};

export const githubApiHandlers = {
  accessToken: {
    success(): HttpHandler {
      return http.get("https://github.com/login/oauth/access_token", () => {
        return HttpResponse.json({
          access_token: "DUMMY TOKEN",
        });
      });
    },
    error(): HttpHandler {
      return http.get("https://github.com/login/oauth/access_token", () => {
        return HttpResponse.json(
          {
            message: "internal server error",
          },
          { status: 500 },
        );
      });
    },
  },
  user: {
    success(): HttpHandler {
      return http.get("https://api.github.com/user", () => {
        return HttpResponse.json({
          id: 123,
          name: "DUMMY USER",
          email: "test@example.com",
        });
      });
    },
    error(): HttpHandler {
      return http.get("https://api.github.com/user", () => {
        return HttpResponse.json(
          {
            message: "internal server error",
          },
          { status: 500 },
        );
      });
    },
  },
};
