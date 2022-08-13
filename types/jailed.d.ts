declare module "jailed" {
  class JailedPlugin {
    whenConnected(f: () => void): void;
    whenDisconnected(f: () => void): void;
    // The documentation doesn't state any parameters are given to the callback,
    // but this is very unlikely to be the case.
    whenFailed(f: () => void): void;
    remote: unknown;
  }

  class Plugin extends JailedPlugin {
    constructor(path: string, api?: unknown);
  }

  class DynamicPlugin extends JailedPlugin {
    constructor(path: string, api?: unknown);
  }
}
