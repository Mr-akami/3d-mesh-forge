# 3d-mesh-forge

## Developer setup

- `cd backend/external/blender-script` and `. .venv/bin/activate` : activate python venv
- `pnpm dev` : start frontend and backend.
- `uv run ruff check --fix`: python lint check
- `uv run ruff format`: python format

## History

### Setup pthon

I gave up to use Nix due to I couldn't install bpy in nix shell.  
So I use host node.js and python venv by uv.

- `uv venv`
- `uv python pin 3.7` # bpy requires 3.7
- `uv python install`
- `. .venv/bin/activate` # opposite `deactibate`
- `uv pip install bpy`
