declare module 'event-source-polyfill' {
  export class EventSourcePolyfill extends EventSource {
    constructor(
      url: string | URL,
      init?: EventSourceInit & {
        headers?: Record<string, string>
        withCredentials?: boolean
      }
    )
  }
}
