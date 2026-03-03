from fastapi import FastAPI
import os
from core.api.app import APP as BASE_APP

APP = FastAPI(title="Obsidia Node API", version="0.1")
NODE_ID = os.getenv("OBSIDIA_NODE_ID", "node")

APP.mount("/", BASE_APP)

@APP.get("/node")
def node_info():
    return {"node_id": NODE_ID}
