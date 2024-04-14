import base64
from fastapi import FastAPI
from fastapi import UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import csv

from fastapi.staticfiles import StaticFiles
from forecast import forecast
from graph import plot
import uvicorn
import os


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict")
async def upload_csv(file: UploadFile = File(...), withGlobal: bool = True, withIndia: bool = True):
    print("called")
    contents = await file.read()
    contents = contents.decode("utf-8")
    lines = contents.split("\n")
    reader = csv.reader(lines)
    lst = []
    for row in reader:
        for i in row:
            if i == 'Cases':
                continue
            lst.append(int(i))
    res = forecast(lst, 1143-len(lst))
    resPath = plot(res, withGlobal, withIndia)
    with open(resPath, 'rb') as f:
        base64image = base64.b64encode(f.read())
    return base64image

app.mount("/", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "build/"), html=True), name="build")


# run the app
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)
