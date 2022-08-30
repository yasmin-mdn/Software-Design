import { useState } from "react";
import { BASE_URL } from "../constants";
import { CookieHandler, toastError } from "../classes";

export function useApi<T = any>(
  method: any,
  defaultValue: any,
  options?: {
    onSuccess?: Function;
    onError?: Function;
    callOnInit?: boolean;
    initData?: any;
    convertor?: (data: any) => T;
  }
) {
  const [data, setData] = useState(defaultValue);
  const [pending, setPending] = useState(false);
  const [inited, setInited] = useState(false);
  const request = async (data?: any) => {
    return new Promise(async (resolve) => {
      try {
        setPending(true);
        const req = await method(data);
        const body = await req.json();
        if (req.ok) {
          if (options?.convertor) {
            setData(options.convertor(body));
          } else setData(body);
          if (options && typeof options.onSuccess === "function")
            options.onSuccess(body);

          resolve(true);
        } else throw Error(body.error ? body.error : body.message || " ");
      } catch (e: any) {
        if (options && typeof options.onError === "function")
          options.onError(e);
        toastError(e.message);
        resolve(false);
      } finally {
        setPending(false);
      }
    });
  };

  if (!inited && options && options.callOnInit) {
    setInited(true);
    request(options.initData);
  }

  return [request, data, pending];
}

const getBaseUrl = () => BASE_URL;

const getHeader = () => ({
  "Content-type": "application/json; charset=UTF-8",
  Authorization: `Bearer ${CookieHandler.getToken()}`,
});

export function get$(
  url: string,
  params?: { key: string; value: string | number | null }[]
) {
  const u =
    url +
    (params && params.length > 0
      ? "?" + params.map((i) => i.key + "=" + i.value).join("&")
      : "");
  return fetch(getBaseUrl() + u, {
    method: "GET",
    headers: getHeader(),
  });
}

export function post$(url: string, body: any) {
  return fetch(getBaseUrl() + url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: getHeader(),
  });
}

export function patch$(url: string, id: string, body: any) {
  return fetch(getBaseUrl() + url + `/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: getHeader(),
  });
}

export function delete$(url: string, id: string, hasId?: boolean) {
  if (hasId) {
    return fetch(getBaseUrl() + url + "?id=" + id, {
      method: "DELETE",
      headers: getHeader(),
    });
  } else {
    return fetch(getBaseUrl() + url, {
      method: "DELETE",
      headers: getHeader(),
    });
  }
}
