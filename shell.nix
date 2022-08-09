let
  pkgs = import <nixpkgs> {};
  system = "x86_64-darwin";
  overlay = (self: super: rec {
  });
in
with pkgs;
stdenv.mkDerivation {
  name = "node";
  buildInputs = [
    nodejs-16_x
    # This is required to allow node-gyp to run so the binaries can be properly
    # emitted for fsevents. This is an adapted fix taken from here:
    # https://github.com/symphony-org/frost/commit/faee685c75f7fad7d7d6ad2c8f1e68053355c176
  ];
  shellHook = ''
      export PATH="$PWD/node_modules/.bin/:$PATH"
      alias scripts='jq ".scripts" package.json'
  '';
}
