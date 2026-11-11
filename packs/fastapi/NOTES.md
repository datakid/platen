Verified with fastapi 0.162.2, pydantic 2.13.5 and httpx 0.28.1: every one of the 146 examples was executed as a module, its OpenAPI schema built with warnings as errors, and each route hit with TestClient; test functions were run directly.
Not verified: a live server (uvicorn), real file sizes or streaming behaviour; examples assume from fastapi import ..., from pydantic import ... and Annotated from typing.
meta.json uses 0.162 because the toolchain reports a newer stable release than the 0.115 floor.
