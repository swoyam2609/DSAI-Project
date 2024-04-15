import matplotlib.pyplot as plt
import pandas as pd
import os
from pathlib import Path

df = pd.read_csv(str(Path().absolute())+"/Dataset/global_cases.csv")
df2 = pd.read_csv(str(Path().absolute())+"/Dataset/india_cases.csv")

lstGlobal = []
lstIndia = []

for index, row in df.iterrows():
    lstGlobal.append(row['Cases'])

for index, row in df2.iterrows():
    lstIndia.append(row['Cases'])


def plot(lst: list, withGlobal: bool, withIndia: bool):
    plt.figure(figsize=(10, 6))
    plt.plot(lst, label="Predicted")
    if(withGlobal):
        plt.plot(lstGlobal, label="Covid-19 Global")
    if(withIndia):
        plt.plot(lstIndia, label="Covid-19 India")
    plt.legend()
    plt.xlabel("Days")
    plt.ylabel("Infected Population")
    plt.savefig("./plot.png")
    plt.close()
    return os.path.abspath("plot.png")
