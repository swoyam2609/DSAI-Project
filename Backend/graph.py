import matplotlib.pyplot as plt
import pandas as pd
import os

df = pd.read_csv("./Dataset/global_cases.csv")
df2 = pd.read_csv("./Dataset/india_cases.csv")

lstGlobal = []
lstIndia = []

for index, row in df.iterrows():
    lstGlobal.append(row['Cases'])

for index, row in df2.iterrows():
    lstIndia.append(row['Cases'])


def plot(lst: list):
    plt.figure(figsize=(10, 6))
    plt.plot(lst, label="Predicted")
    plt.plot(lstGlobal, label="Covid-19 Global")
    plt.plot(lstIndia, label="Covid-19 India")
    plt.legend()
    plt.savefig("./plot.png")
    plt.close()
    return os.path.abspath("plot.png")
