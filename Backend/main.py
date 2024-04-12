from fastapi import FastAPI
from fastapi import UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import csv
from forecast import forecast
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

@app.get("/")
def read_root():
    return {"Backend": "Working"}


@app.post("/predict")
async def upload_csv(file: UploadFile = File(...)):
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
    return {"message": res}

# run the app
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
