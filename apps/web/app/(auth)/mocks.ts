import { http, HttpHandler, HttpResponse } from "msw";
import { coreApiUrl } from "../lib/api/url";

export const coreApiHandlers: {
  register: {
    success: () => HttpHandler;
    error: () => HttpHandler;
    conflict: () => HttpHandler;
  };
  login: {
    success: () => HttpHandler;
    error: () => HttpHandler;
  };
  forgot: {
    success: () => HttpHandler;
    error: () => HttpHandler;
  };
  reset: {
    success: () => HttpHandler;
    error: () => HttpHandler;
  };
} = {
  register: {
    success() {
      return http.post(`${coreApiUrl}/auth/register`, () => {
        return new HttpResponse("not reached");
      });
    },
    error() {
      return http.post(`${coreApiUrl}/auth/register`, () => {
        return new HttpResponse("not reached", { status: 500 });
      });
    },
    conflict() {
      return http.post(`${coreApiUrl}/auth/register`, () => {
        return new HttpResponse("not reached", { status: 409 });
      });
    },
  },
  login: {
    success() {
      return http.post(`${coreApiUrl}/auth/login`, () => {
        return HttpResponse.json({
          token: "DUMMY TOKEN",
        });
      });
    },
    error() {
      return http.post(`${coreApiUrl}/auth/login`, () => {
        return new HttpResponse(undefined, { status: 500 });
      });
    },
  },
  forgot: {
    success() {
      return http.post(`${coreApiUrl}/auth/forgot`, () => {
        return new HttpResponse("not reached");
      });
    },
    error() {
      return http.post(`${coreApiUrl}/auth/forgot`, () => {
        return new HttpResponse(undefined, { status: 500 });
      });
    },
  },
  reset: {
    success() {
      return http.post(`${coreApiUrl}/auth/reset`, () => {
        return new HttpResponse("not reached");
      });
    },
    error() {
      return http.post(`${coreApiUrl}/auth/reset`, () => {
        return new HttpResponse(undefined, { status: 500 });
      });
    },
  },
};
