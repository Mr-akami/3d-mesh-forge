{
  description = "Nix for water flow prediction: Python project";

  inputs = {
    nixpkgs = { url = "github:NixOS/nixpkgs/nixpkgs-unstable"; };
    flake-utils = { url = "github:numtide/flake-utils"; };
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        inherit (nixpkgs.lib) optional;
        pkgs = import nixpkgs { inherit system; };

        rye = pkgs.rye;
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = [
            rye
          ];
          shellHook = ''
            if [ -z "$IN_NIX_SHELL_ZSH" ]; then
              export IN_NIX_SHELL_ZSH=1
              exec ${pkgs.zsh}/bin/zsh --login
            fi
          '';
        };
      });
}